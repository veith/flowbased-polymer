/*
`<flowbased-polymer>`
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../mixin.js';

import '@polymer/polymer/polymer-legacy.js';
import './count-points.js';
import './receive-value.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class FlowbasedPolymer extends FBPMixin(PolymerElement) {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
            }
        </style>

        <div>
            <paper-button id="buttonA" @-click="--buttonTapped,((prop)),((deepprop.sub)),--tapped(sendval), ^^bubbling, ^nonbubbling, ^^bubblingdata(sendval), ^nonbubblingdata(sendval)">
                Button
            </paper-button>
        </div>

        <count-points id="counter" counter="{{counter}}" ƒ-increment="--buttonTapped,--buttonBTapped"></count-points>

        <receive-value id="receive" ƒ-reg="--tapped" ƒ-sum="--buttonCTapped" @-ƒ-sum="((atf))" ƒ-camel-case="--buttonDTapped" ƒ-nonexistent="--buttonETapped" ƒ-deep="--buttonFTapped"></receive-value>

        <paper-button id="buttonB" @-click="--buttonBTapped">Button</paper-button>
        <paper-button id="buttonC" @-click="--buttonCTapped(args)">Button</paper-button>
        <paper-button id="buttonD" @-click="--buttonDTapped">Button</paper-button>
        <paper-button id="buttonE" @-click="--buttonETapped">Button</paper-button>
        <paper-button id="buttonEvent" @-click="--tapped(*)">Button</paper-button>
        <paper-button id="buttonF" @-click="--buttonFTapped(sendvalDeep.a),^^bubbleDeep(sendvalDeep.a),^nonbubbleDeep(sendvalDeep.a)">Button</paper-button>
`;
  }

  static get is() {

      return 'flowbased-polymer';
  }

  static get properties(){
  return {
      counter: {
          type: Number,
          value: 0
      },
      prop: {
          type: Number,
          value: 10
      },
      deepprop: {
          type: Object,
          value: {sub:9999}
      },
      sendval: {
          type: Number,
          value: 42
      },
      atf: {
          type: Number,
          value: 11142
      },
      args: {
          type: Array,
          value: [3, 4, 5]
      },
      sendvalDeep: {
          type: Object,
          value: {a:1337}
      }
  }
  }
}

window.customElements.define(FlowbasedPolymer.is, FlowbasedPolymer);
