const FBPMixin = (superClass) => {
    /**
     * @polymerMixinClass
     */
    return class extends superClass {
        constructor() {
            super();
            this.__FBPEventlistener = [];
            this.__wirebundle = {};
        }


        // für Polymer
        _attachDom(dom) {
            this._appendFBP(dom);
            super._attachDom(dom);
        }

        // for lit elements
        firstUpdated(changedProperties) {
            this._appendFBP(this.shadowRoot);
            super.firstUpdated();
        }

        /**
         * Triggers a wire
         * @param wire (String) Name of the wire like --buttonClicked
         * @param detailData (*) data to pass
         * @private
         */
        _FBPTriggerWire(wire, detailData) {
            if (this.__wirebundle[wire]) {
                let self = this;
                this.__wirebundle[wire].forEach(function (receiver) {
                    // check for hooks
                    if (typeof receiver === 'function') {
                        receiver(detailData);
                    } else {
                        if (typeof receiver.element[receiver.method] === 'function') {
                            let response;
                            // array spreaden
                            if (Array.isArray(detailData) && receiver.element[receiver.method].length > 1) {
                                response = receiver.element[receiver.method].apply(receiver.element, detailData);
                            } else {
                                response = receiver.element[receiver.method](detailData);
                            }
                            // @-ƒ-function auslösen
                            let customEvent = new Event('ƒ-' + receiver.method, {composed: true, bubbles: false});
                            customEvent.detail = response;
                            receiver.element.dispatchEvent(customEvent);

                        } else if (receiver.property) {
                            let data = detailData;
                            if (receiver.path) {
                                data = self._pathGet(detailData, receiver.path)
                            }
                            receiver.element[receiver.property] = data
                        } else {
                            console.warn(receiver.method + ' is neither a listener nor a function of ' + receiver.element.nodeName)
                        }
                    }

                });
            }
        }

        /**
         *
         * @param wire (String) Name of the wire
         * @param cb (function) Callback function cb(detailData)
         * @param [before] (Boolean) append before the components are triggered, default is false
         * @returns {number} Index of hook
         * @private
         */
        _FBPAddWireHook(wire, cb, before) {
            before = before || false;
            if (this.__wirebundle[wire]) {
                if (before) {
                    this.__wirebundle[wire].unshift(cb);
                    return 0;
                } else {
                    let l = this.__wirebundle[wire].push(cb);
                    return l - 1;
                }

            } else {
                this.__wirebundle[wire] = [cb];
                return 1;
            }


        }

        /**
         * parses the dom for flowbased programming tags
         * @param dom dom node
         * @private
         */
        _appendFBP(dom) {
            let self = this;
            let wirebundle = this.__wirebundle;
            // get all elements which live in the host
            let nl = dom.querySelectorAll('*');
            let l = nl.length - 1;
            for (var x = l; x >= 0; --x) {
                let element = nl[x];

                for (let i = 0; i < element.attributes.length; i++) {

                    // collect data receiver
                    if (element.attributes[i].name.startsWith('ƒ-$')) {

                        // get property name and convert to camel case
                        let propertyname = element.attributes[i].name.substr(3).replace(/-([a-z])/g, function (g) {
                            return g[1].toUpperCase();
                        });


                        // split multiple wires
                        element.attributes[i].value.split(',').forEach(function (w) {
                            // finde --wire(*.xx.yy)  => group1 = --wire  group2 = xx.yy
                            //let match = w.trim().match(/(^[^\(]*)\(\*\.?([^\)]*)/);
                            let match = w.trim().match(/(^[^\(]*)\(?\*?\.?([^\)]*)/);
                            let receivingWire = match[1];
                            let path = match[2]

                            if (!wirebundle[receivingWire]) {
                                wirebundle[receivingWire] = [];
                            }
                            wirebundle[receivingWire].push({
                                "element": element,
                                "property": propertyname,
                                "path": path
                            });
                        });
                        continue;
                    }

                    // collect receiving tags
                    if (element.attributes[i].name.startsWith('ƒ-')) {
                        // get method name and convert to camel case
                        let methodname = element.attributes[i].name.substr(2).replace(/-([a-z])/g, function (g) {
                            return g[1].toUpperCase();
                        });


                        // collect receiver
                        element.attributes[i].value.split(',').forEach(function (w) {
                            let receivingWire = w.trim();
                            if (!wirebundle[receivingWire]) {
                                wirebundle[receivingWire] = [];
                            }
                            wirebundle[receivingWire].push({"element": element, "method": methodname});
                        });
                        continue;
                    }


                    // collect sending tags
                    if (element.attributes[i].name.startsWith('@-')) {
                        let eventname = element.attributes[i].name.substr(2);
                        let wire;


                        let fwires = element.attributes[i].value;
                        fwires.split(',').forEach(function (fwire) {
                            let trimmedWire = fwire.trim();

                            let type = "call";
                            if (trimmedWire.startsWith('((')) {
                                wire = trimmedWire.substring(2, trimmedWire.length - 2);
                                type = "setValue";


                            } else if (trimmedWire.startsWith('-^')) {
                                wire = trimmedWire.substring(2);
                                type = "fireOnHost";
                            } else if (trimmedWire.startsWith('^')) {
                                wire = trimmedWire.substring(1);
                                type = "fire";
                                if (trimmedWire.startsWith('^^')) {
                                    wire = trimmedWire.substring(2);
                                    type = "fireBubble";
                                }

                            } else if (trimmedWire == ':STOP') {
                                type = "stop";
                                wire = "stop";
                            } else {
                                wire = trimmedWire;
                                type = "call";
                            }

                            registerEvent(eventname, type, wire, element);
                        });
                        continue;
                    }
                }
            }


            /**
             * register event on current element
             * @param eventname
             * @param type
             * @param wire
             */
            function registerEvent(eventname, type, wire, element) {

                // find properties in wire
                element.__atf = {};
                let match = wire.match(/([a-z0-9\-_*\.]+)/gi);
                // store @-ƒ-attributes existence
                for (let i = 0; i < element.attributes.length; i++) {
                    element.__atf[element.attributes[i].name] = true;
                }


                let handler = {
                    // prevent default and stop propagation
                    "stop": function (e) {
                        e.preventDefault()
                        e.stopPropagation()
                    },

                    "call": function (e) {
                        /**
                         * Prüfe ob die Funktion mit einem Wert aus dem Host oder mit den Details des Events ausgeführt werden soll.
                         * --wire(hostName) ==> wirft this.hostName in die Funktion sonst wird e.detail verwendet
                         *
                         */

                        let effectiveWire = wire;
                        let detailData = e.detail;
                        if (match !== null && match.length > 1) {
                            // --wireName(*) sends the raw event
                            if (match[1] === '*') {
                                detailData = e;
                            } else {
                                detailData = self._pathGet(self, match[1]);
                            }
                            effectiveWire = match[0];
                        }

                        self._FBPTriggerWire(effectiveWire, detailData);

                    },


                    "fire": function (e) {
                        if (match !== null && match.length > 1) {
                            let prop = match[1];
                            let theEvent = match[0];
                            let customEvent = new Event(theEvent, {composed: false, bubbles: true});
                            // send details with *.sub or *
                            if (prop.startsWith("*")) {
                                if (prop.length == 1) {
                                    customEvent.detail = e;
                                } else {
                                    customEvent.detail = self._pathGet(e, prop.substr(2))
                                }
                            } else {
                                customEvent.detail = self._pathGet(self, prop);
                            }
                            e.currentTarget.dispatchEvent(customEvent);
                        } else {
                            let customEvent = new Event(wire, {composed: false, bubbles: true});
                            customEvent.detail = e.detail;
                            e.currentTarget.dispatchEvent(customEvent);
                        }
                    },

                    "fireOnHost": function (e) {
                        if (match !== null && match.length > 1) {
                            let prop = match[1];
                            let theEvent = match[0];
                            let customEvent = new Event(theEvent, {composed: false, bubbles: true});
                            // send details with *.sub or *
                            if (prop.startsWith("*")) {
                                if (prop.length == 1) {
                                    customEvent.detail = e;
                                } else {
                                    customEvent.detail = self._pathGet(e, prop.substr(2))
                                }
                            } else {
                                customEvent.detail = self._pathGet(self, prop);
                            }
                            self.dispatchEvent(customEvent);
                        } else {
                            let customEvent = new Event(wire, {composed: false, bubbles: true});
                            customEvent.detail = e.detail;
                            self.dispatchEvent(customEvent);
                        }
                    },

                    "fireBubble": function (e) {

                        if (match !== null && match.length > 1) {
                            let prop = match[1];
                            let theEvent = match[0];
                            let customEvent = new Event(theEvent, {composed: true, bubbles: true});
                            // send details with *.sub or *
                            if (prop.startsWith("*")) {
                                if (prop.length == 1) {
                                    customEvent.detail = e;
                                } else {
                                    customEvent.detail = self._pathGet(e, prop.substr(2))
                                }
                            } else {
                                customEvent.detail = self._pathGet(self, prop);
                            }
                            e.currentTarget.dispatchEvent(customEvent);
                        } else {
                            let customEvent = new Event(wire, {composed: true, bubbles: true});
                            customEvent.detail = e.detail;
                            e.currentTarget.dispatchEvent(customEvent);
                        }
                    },
                    "setValue": function (e) {

                        self._pathSet(self, wire, e.detail)

                        //self.set(wire, e.detail, self);
                    }
                };


                element.addEventListener(eventname, handler[type]);
                self.__FBPEventlistener.push({
                    "element": element,
                    "event": eventname,
                    "handler": handler[type]
                });

            }
        }

        disconnectedCallback() {
            super.disconnectedCallback();
            /* remove event listeners*/
            this.__FBPEventlistener.forEach(function (e) {
                e.element.removeEventListener(e.event, e.handler);
            })
        }

        /**
         * Reads a value from a path.  If any sub-property in the path is `undefined`,
         * this method returns `undefined` (will never throw.
         *
         * @param {Object} root Object from which to dereference path from
         * @param {string | !Array<string|number>} path Path to read
         * @param {Object=} info If an object is provided to `info`, the normalized
         *  (flattened) path will be set to `info.path`.
         * @return {*} Value at path, or `undefined` if the path could not be
         *  fully dereferenced.
         */
        _pathGet(root, path, info) {
            let prop = root;
            let parts = this._split(path);
            // Loop over path parts[0..n-1] and dereference
            for (let i = 0; i < parts.length; i++) {
                if (!prop) {
                    return;
                }
                let part = parts[i];
                prop = prop[part];
            }
            if (info) {
                info.path = parts.join('.');
            }
            return prop;
        }

        /**
         * Sets a value to a path.  If any sub-property in the path is `undefined`,
         * this method will no-op.
         *
         * @param {Object} root Object from which to dereference path from
         * @param {string | !Array<string|number>} path Path to set
         * @param {*} value Value to set to path
         * @return {string | undefined} The normalized version of the input path
         */
        _pathSet(root, path, value) {
            let prop = root;

            let parts = this._split(path);
            let last = parts[parts.length - 1];
            if (parts.length > 1) {
                // Loop over path parts[0..n-2] and dereference
                for (let i = 0; i < parts.length - 1; i++) {
                    let part = parts[i];
                    prop = prop[part];
                    if (!prop) {
                        return;
                    }
                }
                // Set value to object at end of path
                prop[last] = value;
                this.requestUpdate(parts[0])
            } else {
                // Simple property set
                prop[path] = value;
            }
            return parts.join('.');
        }


        /**
         * Splits a path into an array of property names. Accepts either arrays
         * of path parts or strings.
         *
         * Example:
         *
         * ```
         * split(['foo.bar', 0, 'baz'])  // ['foo', 'bar', '0', 'baz']
         * split('foo.bar.0.baz')        // ['foo', 'bar', '0', 'baz']
         * ```
         *
         * @param {string | !Array<string|number>} path Input path
         * @return {!Array<string>} Array of path parts
         * @suppress {checkTypes}
         */
        _split(path) {
            if (Array.isArray(path)) {
                return this._normalize(path).split('.');
            }
            return path.toString().split('.');
        }

        /**
         * Converts array-based paths to flattened path.  String-based paths
         * are returned as-is.
         *
         * Example:
         *
         * ```
         * normalize(['foo.bar', 0, 'baz'])  // 'foo.bar.0.baz'
         * normalize('foo.bar.0.baz')        // 'foo.bar.0.baz'
         * ```
         *
         * @param {string | !Array<string|number>} path Input path
         * @return {string} Flattened path
         */
        _normalize(path) {
            if (Array.isArray(path)) {
                let parts = [];
                for (let i = 0; i < path.length; i++) {
                    let args = path[i].toString().split('.');
                    for (let j = 0; j < args.length; j++) {
                        parts.push(args[j]);
                    }
                }
                return parts.join('.');
            } else {
                return path;
            }
        }
    }


};

/**
 * flowbased-polymer
 *
 * The flowbased-polymer mixin offers you the possibility to **write your components or apps fully declaratively**. No more manual/imperative adding of eventlisteners in the source code and no more assignment of IDs to access the component you want.
 *
 * You can use it to simply save adding eventlisteners in your source or to write entire components and applications according to the FBP programming paradigm without using a single line of JS. It's up to you how far you want to go.
 *
 * FBP code is also easy testable. It takes about 2 minutes to understand the main concept.
 *
 * It is a hybrid form of flow-based programming and ordinary polymer and works with every component which is useable by polymer.
 *
 * ## Simple Introduction
 * In short, FBP combines events from one component `@-event` with methods from another component `ƒ-method` to trigger them. We call the connection a **wire**.
 *
 *  ```
 * <paper-button raised @-click="--btnPropsClicked">Show Props</paper-button>
 * <left-drawer ƒ-hide="--btnPropsClicked">Menu...</left-drawer>
 * <right-drawer ƒ-show="--btnPropsClicked">Props...</right-drawer>
 * ```
 *
 * ![simple intro](https://veith.github.io/flowbased-polymer/images/short-intro.png)
 *
 *
 * ### What happens in the example above
 * When the user clicks on the `paper-button`, the `left-drawer` is hidden and the `right-drawer` is displayed.
 * The button does not need to know that there is a left-drawer or right-drawer. It only informs about the wire `--btnPropsClicked` that it was clicked.
 *
 * ## Further documentation
 * Please read the [documentation page](https://veith.github.io/flowbased-polymer/wireing/overview/) for more information.
 *
 *
 * ## Detailed documentation
 * Read more about FBPolymer on the  [documentation pages](https://veith.github.io/flowbased-polymer/).
 *
 *
 * ## License
 *
 * MIT
 *
 *
 * @polymer
 * @mixinFunction FBP
 */
export const FBP = FBPMixin;
