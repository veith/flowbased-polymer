import { LitElement, html } from 'lit-element';
import {FBP} from "../fbp.js";

/**
 * `data-maker`
 *
 * @customElement
 * @demo demo/index.html
 * @appliesMixin FBP
 */
class DataMaker extends FBP(LitElement) {

  constructor() {
    super();
    this.data = [{a:2,arr:[1,2,3]},{a:1,arr:[12,2,3]},{a:3,arr:[41,2,3]},{a:23,arr:[71,2,3]},{a:14,arr:[1,42,3]},{a:35,arr:[13,2,3]}];
  }

    static get properties() {
        return {
            data: {type: Array, attribute:true}
        };
    }

  render() {
    // language=HTML
    return html`
      <!-- Add a style block here -->
      <style>
        :host {
          display: inline;
        }
        span{
        border:1px solid green;
        padding: 8px;
        }
      </style>
      <span @-click="^^data(data)">Make ${this.data.length} Data</span>
    `;
  }

}

window.customElements.define('data-maker', DataMaker);
