import {PolymerElement, html} from '@polymer/polymer';
import {FBP} from "../fbp";
import "../flow-repeat"
import "./data-maker"
import "./rep-item"

/**
 * `repeat-help`
 *
 *
 * @summary
 * @customElement
 * @polymer
 * @mixes FBP
 */
class RepeatHelp extends FBP(PolymerElement) {
    static get template() {
        // language=HTML
        return html`
            <style>
                :host {
                    display: block;
                }


            </style>
            <data-maker @-data="--newData"></data-maker>
            <data-maker @-data="--newData" data="[3,5,7,2]"></data-maker>
            <table width="100%">
                <tbody>
                <tr>
                    <template is="dom-repeat" ƒ-.items="--newData">

                        <td>
                            <b>neu</b>
                            <rep-item ƒ-raw="--itemInjected" @-click="--xx">fddf</rep-item>
                            <rep-item ƒ-index="--itemInjected(*.index)" ƒ-yy="--xx">fdfd</rep-item>
                        </td>
                    </template>

                </tr>
                </tbody>
            </table>
            <hr>
            <hr>

            <table width="100%">

                <tr>
                    <template is="flow-repeat" ƒ-inject-items="--newData"
                              internal-wire="--itemInjected">
                        <td>
                            <b>neu</b>
                            <rep-item ƒ-raw="--itemInjected" @-click="--xx">fddf</rep-item>
                            <rep-item ƒ-index="--itemInjected(*.index)" ƒ-yy="--xx">fdfd</rep-item>
                        </td>
                    </template>

                </tr>
            </table>
            <ul>
            <flow-repeat style="display: table-cell;" items="[[data]]" ƒ-inject-items="--newData"
                         internal-wire="--itemInjected">
                <template>

                    <li>
                        <b>neu</b>
                        <rep-item ƒ-raw="--itemInjected" @-click="--xx">fddf</rep-item>
                        <rep-item ƒ-index="--itemInjected(*.index)" ƒ-yy="--xx">fdfd</rep-item>
                    </li>
                </template>
            </flow-repeat>
            </ul>
        `;
    }

    static get properties() {
        return {
            data: {type: Array, value: [1, 2, 3, 4]}
        };
    }

}

window.customElements.define('repeat-help', RepeatHelp);
