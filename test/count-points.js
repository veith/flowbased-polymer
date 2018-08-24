import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `count-points`
 * ddd
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class countPoints extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
   [[label]] [[counter]]
    `;
    }
    static get properties() {
        return {
            counter: {
                type: Number,
                value: 0,
                readOnly: true,
                notify: true
            },
            /**
             *
             *  Bezeichnung des Counters
             */
            label: {
                type: String
            },

            _lock: {
                type: Boolean,
                value: false
            }
        };
    }
    increment () {
        if (!this._lock) {
            this._setCounter(++this.counter);
        }
    }

    reset () {
        this._setCounter(0);
        this._lock = false;
    }

    lock () {
        this._lock = true;
    }
}

window.customElements.define('count-points', countPoints);
