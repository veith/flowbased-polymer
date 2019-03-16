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
    this.data = [{a:2},{a:1},{a:3},{a:23},{a:14},{a:35}];
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
