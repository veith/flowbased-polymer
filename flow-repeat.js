import {FBP} from './fbp.js';

/**
 * `flow-repeat`
 * Native element
 *
 * @customElement
 */


/**
 *
 * @appliesMixin FBP
 */
class FlowRepeat extends FBP(HTMLElement) {

    constructor() {
        super();
        this.template;
        this._insertedItems = [];

    }


    injectItems(items) {
        if (!Array.isArray(items)) {
            console.error("Items is not an array ", items);
            return;
        }
        items.forEach((e, i, a) => {
            // build hidden elem
            let elem = document.createElement('f-r-i');
            elem.attachShadow({mode: 'open'});
            elem.shadowRoot.appendChild(this.template.cloneNode(true));
            elem._appendFBP(elem.shadowRoot);

            let handle = {virtualElement:elem, children: [].slice.call(elem.shadowRoot.children)};

            // remove old entries
            if(this._insertedItems[i]){
                this._insertedItems[i].children.map((attachedElem)=>{attachedElem.remove()})
            }
            this._insertedItems[i]= handle;

            this.parentNode.appendChild(elem.shadowRoot);

            // trigger wires
            elem._FBPTriggerWire(this._internalWire, {item: e, index: i});
        });

        // remove entries in old array if items is smaller
        this._insertedItems.slice(items.length,this._insertedItems.length).map((handle)=>{
            handle.children.map((attachedElem)=>{attachedElem.remove()})
        })
    }

    connectedCallback() {
        this.style.display = "none";
        // Create a shadow root to the element.
        this.attachShadow({mode: 'open'});
        let t = this.querySelector('template');
        this.template = t._templateInfo.content;

        this._internalWire = this.getAttribute("internal-wire") || "--itemInjected"

    }

}

window.customElements.define('flow-repeat', FlowRepeat);

// empty fbp element handler to have fbp scope
class FlowRepeatItem extends FBP(HTMLElement) {

}
window.customElements.define('f-r-i', FlowRepeatItem);
