/**
`<receive-value>` is a component for



@author veith
@date 23.04.17
@hero path/to/image
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { FlowBasedProgramming } from '../behaviour.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style>
      :host {
        display: block;
      }
    </style>

    HI
`,

  is: 'receive-value',
  behaviors: [FlowBasedProgramming],

  /**
   * Fired when menu button is pressed.
   *
   * @event myevent
   */

  properties: {
    received:{
      type:Number
    },
      sumval:{
      type:Number,
      notify:true,
          value:1
    }
  },

  reg:function (val) {
      this.set('received',val);
  },

  sum:function (a,b,c) {
      var val = (a+b+c);
      this.set('sumval',val);
      return val;
  },

  camelCase:function () {
      this.set('received',137)
  },

  hook:function(data){

    this.fire('hook-triggered',data);
  },

  hooktest:function(data){

    this.hooktestValue = data;
  },

  deep:function (data) {
      console.log('deepdata received')
  }
});
