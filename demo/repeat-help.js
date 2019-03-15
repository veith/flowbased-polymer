import {PolymerElement, html} from '@polymer/polymer';
import {FBP} from "../fbp";
import "../flow-repeat"
import "./data-maker"

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
            <table width="100%">
                <tbody>
                <tr>
                    <template is="dom-repeat" items="[[data]]">
                         
                            <td>
                                <b>neu</b>
                                <rep-item ƒ-raw="--itemInjected" @-click="--xx">fddf</rep-item>
                                <rep-item ƒ-detail="--itemInjected(*.data)" ƒ-yy="--xx">fdfd</rep-item>
                            </td>
                        </template>
                     
                </tr>
                </tbody>
            </table>
            <hr>
            <hr>

            <table width="100%">

                <tr>
                    <template is="flow-repeat" items="[[data]]" ƒ-inject-items="--newData"
                                 internal-wire="--itemInjected">
                     
                        

                            <td>
                                <b>neu</b>
                                <rep-item ƒ-raw="--itemInjected" @-click="--xx">fddf</rep-item>
                                <rep-item ƒ-detail="--itemInjected(*.data)" ƒ-yy="--xx">fdfd</rep-item>
                            </td>
                        
                        
                    </template>
                    
                </tr>

            </table>
            <!-- flow-repeat style="display: table-cell;" items="[[data]]" ƒ-inject-items="--newData"
                         internal-wire="--itemInjected">
                <template>

                    <td>
                        <b>neu</b>
                        <rep-item ƒ-raw="--itemInjected" @-click="--xx">fddf</rep-item>
                        <rep-item ƒ-detail="--itemInjected(*.data)" ƒ-yy="--xx">fdfd</rep-item>
                    </td>
                </template>
            </flow-repeat -->

        `;
    }

    static get properties() {
        return {
            data: {type: Array, value: [1, 2, 3, 4]}
        };
    }

}

window.customElements.define('repeat-help', RepeatHelp);
