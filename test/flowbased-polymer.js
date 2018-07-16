/*
`<flowbased-polymer>`
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { FlowBasedProgramming } from '../behaviour.js';
import './count-points.js';
import './receive-value.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
        <style>
            :host {
                display: block;
            }
        </style>

        <div>
            <paper-button id="buttonA" @-click="--buttonTapped,((prop)),--tapped(sendval), ^^bubbling, ^nonbubbling, ^^bubblingdata(sendval), ^nonbubblingdata(sendval)">
                Button
            </paper-button>
        </div>

        <count-points id="counter" counter="{{counter}}" ƒ-increment="--buttonTapped,--buttonBTapped"></count-points>

        <receive-value @-hook-triggered="--hookTriggered" ƒ-hooktest="--hookTriggered" id="receive" ƒ-reg="--tapped" ƒ-sum="--buttonCTapped" @-ƒ-sum="((atf))" ƒ-camel-case="--buttonDTapped" ƒ-nonexistent="--buttonETapped"></receive-value>

        <paper-button id="buttonB" @-click="--buttonBTapped">Button</paper-button>
        <paper-button id="buttonC" @-click="--buttonCTapped(args)">Button</paper-button>
        <paper-button id="buttonD" @-click="--buttonDTapped">Button</paper-button>
        <paper-button id="buttonE" @-click="--buttonETapped">Button</paper-button>
`,

  is: 'flowbased-polymer',
  behaviors: [FlowBasedProgramming],

  properties: {
      counter: {
          type: Number,
          value: 0
      },
      prop: {
          type: Number,
          value: 10
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

  }
});
