# flowbased-polymer

The flowbased-polymer mixin offers you the possibility to **write your components or apps fully declaratively**. No more manual/imperative adding of eventlisteners in the source code and no more assignment of IDs to access the component you want.

You can use it to simply save adding eventlisteners in your source or to write entire components and applications according to the FBP programming paradigm without using a single line of JS. It's up to you how far you want to go.

FBP code is also easy testable. It takes about 2 minutes to understand the main concept.

It is a hybrid form of flow-based programming and ordinary polymer and works with every component which is useable by polymer.

## Simple Introduction
In short, FBP combines events from one component `@-event` with methods from another component `ƒ-method` to trigger them. We call the connection a **wire**.

```
    <paper-button raised @-click="--btnPropsClicked">Show Props</paper-button>
    <left-drawer ƒ-hide="--btnPropsClicked"></left-drawer>
    <right-drawer ƒ-show="--btnPropsClicked"></right-drawer>
```

![simple intro](https://veith.github.io/flowbased-polymer/images/short-intro.png)

### Explanation
When the user clicks on the `paper-button`, the `left-drawer` is hidden and the `right-drawer` is displayed.
The button does not need to know that there is a left-drawer or right-drawer. It only informs about the wire `--btnPropsClicked` that it was clicked.



## Further documentation
It takes about 10 minutes to understand the main concept.
Please read the [documentation page](https://veith.github.io/flowbased-polymer/) for more information.


[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/veith/flowbased-polymer)


## Usage
Extend your component with the FBPMixin. Thats all you have to do.

```
 class MyComponent extends FBPMixin(Polymer.Element) {
 }
```

## Detailed documentation
Read more about FBPolymer on the  [documentation pages](https://veith.github.io/flowbased-polymer/).




## Credits

* [John Paul Morrison](http://www.jpaulmorrison.com/) for inventing FBP
* [Kevin Shaaf](https://github.com/kevinpschaaf) for the good hints he gave in the [polymer slack channel](polymer.slack.com)
* [the Polymer contributors](https://github.com/orgs/Polymer/people) for all the good tools

## License

MIT

