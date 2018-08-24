import { DomBind } from '@polymer/polymer/lib/elements/dom-bind.js';
import {FBP} from './fbp-mixin.js';
/**
 * `flow-bind`
 *
 * Custom element to allow using Polymer's template features (Flowbased Polymer,  data binding,
 * declarative event listeners, etc.) in the main document without defining
 * a new custom element.
 *
 * `<template>` tags utilizing bindings may be wrapped with the `<flow-bind>`
 * element, which will immediately stamp the wrapped template into the main
 * document, attach the declarative @-events, ƒ-functions and bind elements to the `flow-bind` element itself as the
 * binding scope.
 *
 * @polymer
 * @customElement
 * @demo demo/flow-bind.html
 * @mixes FBP
 * @summary Custom element to allow using Flowbased-Polymer's template features (data
 *   binding, declarative event listeners, etc.) in the main document.
 */
class FlowBind extends FBP(DomBind) {
    connectedCallback() {
        super.connectedCallback();
        this.__appendFBP(this.parentNode);
    }

    static get is() {
        return 'flow-bind';
    }
}

window.customElements.define(FlowBind.is, FlowBind);
