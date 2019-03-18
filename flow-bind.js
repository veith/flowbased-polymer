import {FBP} from './fbp.js';
import "./empty-fbp-node"

/**
 * `flow-bind`
 *
 * @customElement
 * @demo demo/flow-bind.html
 * @mixes FBP
 * @summary Custom element to allow using Flowbased-Polymer's template features (data
 *   binding, declarative event listeners, etc.) in the main document.
 */
class FlowBind extends FBP(HTMLElement) {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        let t = this.querySelector('template');
        this.template = t.content;
        let elem = document.createElement("empty-fbp-node");
        elem.attachShadow({mode: 'open'});
        elem.shadowRoot.appendChild(this.template.cloneNode(true));
        elem._appendFBP(elem.shadowRoot);
        this.parentNode.appendChild(elem.shadowRoot);
    }
}

window.customElements.define("flow-bind", FlowBind);
