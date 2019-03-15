import {LitElement, html} from 'lit-element';
import {FBP} from "../fbp";

/**
 * `rep-item`
 *
 * @customElement
 * @demo demo/index.html
 * @appliesMixin FBP
 */
class RepItem extends FBP(LitElement) {

    constructor() {
        super();
    }

    raw(data) {
        this._data = data.item;
        console.log("_data",this._data)
    }

    index(data) {

        this._index = data;
    }

    static get properties() {
        return {
            message: {type: String},
            myArray: {type: Array},
            myBool: {type: Boolean}
        };
    }


    render() {
        // language=HTML
        return html`
            <!-- Add a style block here -->
            <style>
                :host {
                    display: block;
                }
            </style>
           index ${this._index} <br>
           _data ${this._data}
           
        `;
    }

}

window.customElements.define('rep-item', RepItem);
