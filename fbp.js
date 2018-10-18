import * as Path from '@polymer/polymer/lib/utils/path.js';
import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';


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

        /**
         * Triggers a wire
         * @param wire (String) Name of the wire like --buttonClicked
         * @param detailData (*) data to pass
         * @private
         */
        _FBPTriggerWire(wire, detailData) {
            if (this.__wirebundle[wire]) {
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
                console.warn(wire, 'does not exist on element', this);
                return -1;
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
            dom.querySelectorAll('*').forEach(function (element) {
                    for (let i = 0; i < element.attributes.length; i++) {
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


                                } else if (trimmedWire.startsWith('^')) {
                                    wire = trimmedWire.substring(1);
                                    type = "fire";
                                    if (trimmedWire.startsWith('^^')) {
                                        wire = trimmedWire.substring(2);
                                        type = "fireBubble";
                                    }

                                } else {
                                    wire = trimmedWire;
                                    type = "call";
                                }

                                registerEvent(eventname, type, wire, element);
                            });
                        }
                    }
                }
            );


            /**
             * register event on current element
             * @param eventname
             * @param type
             * @param wire
             */
            function registerEvent(eventname, type, wire, element) {
                // find properties in wire
                element.__atf = {};
                let match = wire.match(/([a-z\-_*\.]+)/gi);
                // store @-ƒ-attributes existence
                for (let i = 0; i < element.attributes.length; i++) {
                    element.__atf[element.attributes[i].name] = true;
                }


                let handler = {
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
                                detailData = Path.get(self, match[1]);
                            }
                            effectiveWire = match[0];
                        }

                        self._FBPTriggerWire(effectiveWire, detailData);

                    },


                    "fire": function (e) {
                        if (match !== null && match.length > 1) {
                            let prop = match[1];
                            let theEvent = match[0];
                            let customEvent = new Event(theEvent, {composed: true, bubbles: false});
                            customEvent.detail = Path.get(self, prop);

                            self.dispatchEvent(customEvent);
                        } else {
                            let customEvent = new Event(wire, {composed: true, bubbles: false});
                            customEvent.detail = e.detail;
                            self.dispatchEvent(customEvent);
                        }
                    },

                    "fireBubble": function (e) {

                        if (match !== null && match.length > 1) {
                            let prop = match[1];
                            let theEvent = match[0];
                            let customEvent = new Event(theEvent, {composed: true, bubbles: true});
                            customEvent.detail = Path.get(self, prop);
                            self.dispatchEvent(customEvent);
                        } else {
                            let customEvent = new Event(wire, {composed: true, bubbles: true});
                            customEvent.detail = e.detail;
                            self.dispatchEvent(customEvent);
                        }
                    },
                    "setValue": function (e) {
                        self.set(wire, e.detail, self);
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
export const FBP = dedupingMixin(FBPMixin);
