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
    }


    injectItems(e) {

        let elem = document.createElement('f-r-i');
        elem.attachShadow({mode: 'open'});
        elem.shadowRoot.appendChild(this.template.cloneNode(true));
        elem._appendFBP(elem.shadowRoot);

        this.parentNode.insertBefore(elem.shadowRoot, this);

    }

    connectedCallback() {
        // Create a shadow root to the element.
        this.attachShadow({mode: 'open'});
        let t = this.querySelector('template');
        this.template = t._templateInfo.content;


    }

}

window.customElements.define('flow-repeat', FlowRepeat);


class FlowRepeatItem extends FBP(HTMLElement) {

}
window.customElements.define('f-r-i', FlowRepeatItem);
