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
    this.data = [{a:2},{a:1},{a:3}];
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
      <p @-click="^^data(data)">Make Data</p>
    `;
  }

}

window.customElements.define('data-maker', DataMaker);
