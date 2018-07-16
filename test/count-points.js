/**
@license MIT
*/
/**
`<count-points>` is a component for



@author veith
@date 10.03.17
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

    [[label]] [[counter]]
`,

  is: 'count-points',
  behaviors: [FlowBasedProgramming],

  /**
   * Fired when menu button is pressed.
   *
   * @event myevent
   */

  properties: {
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
  },

  increment: function () {
    if (!this._lock) {
      this._setCounter(++this.counter);
    }
  },

  reset: function () {
    this._setCounter(0);
    this._lock = false;
  },

  lock: function () {
    this._lock = true;
  }
});
