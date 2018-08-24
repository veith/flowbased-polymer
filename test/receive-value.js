import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `receive-value`
 * ddd
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class receiveValue extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
    }
    static get properties() {
        return {
            received:{
                type:Number
            },
            sumval:{
                type:Number,
                notify:true,
                value:1
            }
        };
    }


    reg(val) {
        this.set('received',val);
    }

    sum(a,b,c) {
        var val = (a+b+c);
        this.set('sumval',val);
        return val;
    }

    camelCase() {
        this.set('received',137)
    }

    hook(data){

        this.fire('hook-triggered',data);
    }

    hooktest(data){

        this.hooktestValue = data;
    }

    deep(data) {
        console.log('deepdata received')
    }
}

window.customElements.define('receive-value', receiveValue);
