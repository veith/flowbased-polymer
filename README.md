# flowbased-polymer

## installation

For Polymer 3 and higher use npm:
```
npm i --save  @furo/fpb
```

For Polymer 2 and below use bower:
```
bower install --save veith/flowbased-polymer
```




The flowbased-polymer mixin offers you the possibility to **write your components or apps fully declaratively**. No more manual/imperative adding of eventListeners in the source code and no searching for IDs to access the component you want.

You can use it to simply save adding eventlisteners in your source or to write entire components and applications according to the FBP programming paradigm without using a single line of JS. It's up to you how far you want to go.

FBP code is also easy testable. It takes about 2 minutes to understand the main concept.

It is a hybrid form of flow-based programming and ordinary polymer and works with every component which is useable by polymer.


[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/veith/flowbased-polymer)

## Simple Introduction
In short, FBP combines events from one component `@-event` with methods from another component `ƒ-method` to trigger them. We call the connection a **wire**.

```
    <paper-button raised @-click="--btnPropsClicked">Show Props</paper-button>
    <left-drawer ƒ-hide="--btnPropsClicked">Menu...</left-drawer>
    <right-drawer ƒ-show="--btnPropsClicked">Props...</right-drawer>
```

![simple intro](https://veith.github.io/flowbased-polymer/images/short-intro.png)

### Explanation
When the user clicks on the `paper-button`, the `left-drawer` is hidden and the `right-drawer` is displayed.
The button does not need to know that there is a left-drawer or right-drawer. It only informs about the wire `--btnPropsClicked` that it was clicked.

## Further documentation
Please read the [documentation page](https://veith.github.io/flowbased-polymer/wireing/overview/) for more information.



## Usage 
After importing the Mixin, extend your component with the **FBPMixin**. Thats all you have to do.


```
import {PolymerElement, html} from '@polymer/polymer';
import {FBP} from "@furo/fbp";
// ...


/**
 * `my-component`
 *
 *
 * @summary
 * @customElement
 * @polymer
 * @mixes FBP
 */
class MyComponent extends FBP(PolymerElement) {
    static get template() {
    // language=HTML
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <paper-button raised @-click="--btnPropsClicked">Show Props</paper-button>
      <left-drawer ƒ-hide="--btnPropsClicked">Menu...</left-drawer>
      <right-drawer ƒ-show="--btnPropsClicked">Props...</right-drawer>

    `;
  }

}

window.customElements.define('my-component', MyComponent);
```

## Detailed documentation
Read more about FBPolymer on the  [documentation pages](https://veith.github.io/flowbased-polymer/).



## License

MIT

