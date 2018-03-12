---
date: 2017-04-14T15:47:54+02:00
title: Tutorial
weight: 250
---


Welcome to the tutorial!

We hope you have read the Getting Started Site.

In this tutorial we build an element witch can be showed and hideed.


Generate a polymer element
```sh
mkdir fbp-tutorial
cd fbp-tutorial
polymer init
```
![polymer init](/images/polymer-init.png)

Select polymer-2-element and run it. After this install flowbased polymer

```sh
bower install flowbased-polymer --save
```
Open the project in you favourite editor.

Open the fbp-tutorial.html file and add the import of flowbased polymer.

```html
<link rel="import" href="../flowbased-polymer/mixin.html">
```

Extend the Polymer mixin:
```javascript
extends FBPMixin(Polymer.Element)
```

Remove unneded things like the h2 and the properties. Your File should look like this:

```html
<link rel="import" href="../polymer/polymer-element.html">
<link rel="import" href="../flowbased-polymer/mixin.html">

<dom-module id="fbp-tutorial">
    <template>
        <style>
            :host {
                display: block;
            }
        </style>
    </template>

    <script>
        /**
         * `fbp-tutorial`
         *
         *
         * @customElement
         * @polymer
         * @demo demo/index.html
         */
        class FbpTutorial extends FBPMixin(Polymer.Element) {
            static get is() {
                return 'fbp-tutorial';
            }

            static get properties() {
                return {};
            }
        }

        window.customElements.define(FbpTutorial.is, FbpTutorial);
    </script>
</dom-module>

```

In the next Step we make a Component witch is hideable.

Create a new polymer 2 element called hideable-element.

Add the FBP mixin.

Add a span with e text insinde.

```html
<span>This should hide.</span>
```

And your elemnet shoul look like this:
 
```html
<link rel="import" href="../polymer/polymer-element.html">
<link rel="import" href="../flowbased-polymer/mixin.html">

<dom-module id="hideable-element">
    <template>
        <style>
            :host {
                display: block;
            }
        </style>
        <span>This should hide.</span>
    </template>
    <script>
        /**
         * `hideable-element`
         *
         * @customElement
         * @polymer
         * @demo demo/hideable-element_demo.html
         */
        class HideableElement extends FBPMixin(Polymer.Element) {
            constructor() {
                super();
            }

            static get is() {
                return 'hideable-element';
            }

            static get properties() {
                return {

                };
            }


        }

        window.customElements.define(HideableElement.is, HideableElement);
    </script>
</dom-module>
```

Now we want the span be able to be hidden.

This can be done with css.

First add this css in the Style section:
```css
:host([hidden]) span {
                display: none;
}
```

After we need a property hidden on the hideable-element.
```ecmascript 6
hidden: {
       type: Boolean,
       value: false,
       notify: true,
       reflectToAttribute: true
}
```

Now by default your element is not hidden but when you set the hidden property the element hides.

Your elemnet should now look like this:
```html
<link rel="import" href="../polymer/polymer-element.html">
<link rel="import" href="../flowbased-polymer/mixin.html">

<dom-module id="hideable-element">
    <template>
        <style>
            :host {
                display: block;
            }
            :host([hidden]) span {
                            display: none;
            }
        </style>
        <span>This should hide.</span>
    </template>
    <script>
        /**
         * `hideable-element`
         *
         * @customElement
         * @polymer
         * @demo demo/hideable-element_demo.html
         */
        class HideableElement extends FBPMixin(Polymer.Element) {
            constructor() {
                super();
            }

            static get is() {
                return 'hideable-element';
            }

            static get properties() {
                return {
                    hidden: {
                        type: Boolean,
                        value: false,
                        notify: true,
                        reflectToAttribute: true
                    }
                };
            }
        }

        window.customElements.define(HideableElement.is, HideableElement);
    </script>
</dom-module>
```

Now we want to use our hideable element.

Go back to the fbp-tutorial element.

Import the Element:
```html
<link rel="import" href="./hideable-element.html">
```
And add the element in your template section with tow buttons:
```html
<button>hide</button>
<button>show</button>
<hideable-element></hideable-element>
```

Now we can start wiring the button with our element.

First we need to listen to the click event of the button:
```html
<button @-click="--hide">hide</button>
<button @-click="--show">show</button>
```

Now we want it to wire this on the hideable element:

```html
<button @-click="--hide">hide</button>
<button @-click="--show">show</button>
<hideable-element ƒ-hide="--hide" ƒ-show="--show"></hideable-element>
```

At this moment this sample will not work because we have no functions called hide and show in our hideable-element.

So we create a hide and show function on the hideable-element:

```javascript
hide(e) {
    this.set('hidden', true);
}

show(e) {
     this.set('hidden', false);
}
```

These function will set the hidden attribute on the element.

So now we can serve our project and see the code in the demo.
First we need to gennerate the doc and then we can serve the application

```sh
polymer analyze ./*.html > analysis.json
polymer serve -o
```

If something not working take a look at the finished files:

```html
<link rel="import" href="../polymer/polymer-element.html">
<link rel="import" href="../flowbased-polymer/mixin.html">

<link rel="import" href="./hideable-element.html">

<dom-module id="fbp-tutorial">
    <template>
        <style>
            :host {
                display: block;
            }
        </style>

        <button @-click="--hide">hide</button>
        <button @-click="--show">show</button>
        <hideable-element ƒ-hide="--hide" ƒ-show="--show"></hideable-element>

    </template>

    <script>
        /**
         * `fbp-tutorial`
         *
         *
         * @customElement
         * @polymer
         * @demo demo/index.html
         */
        class FbpTutorial extends FBPMixin(Polymer.Element) {
            static get is() {
                return 'fbp-tutorial';
            }

            static get properties() {
                return {};
            }
        }

        window.customElements.define(FbpTutorial.is, FbpTutorial);
    </script>
</dom-module>
```

```html
<link rel="import" href="../polymer/polymer-element.html">
<link rel="import" href="../flowbased-polymer/mixin.html">

<dom-module id="hideable-element">
    <template>
        <style>
            :host {
                display: block;
            }
            :host([hidden]) span {
                display: none;
            }
        </style>
        <span>This should hide.</span>
    </template>
    <script>
        /**
         * `hideable-element`
         *
         * @customElement
         * @polymer
         * @demo demo/hideable-element_demo.html
         */
        class HideableElement extends FBPMixin(Polymer.Element) {
            constructor() {
                super();
            }

            static get is() {
                return 'hideable-element';
            }

            static get properties() {
                return {
                    hidden: {
                        type: Boolean,
                        value: false,
                        notify: true,
                        reflectToAttribute: true
                    }
                };
            }

            hide(e) {
                this.set('hidden', true);
            }

            show(e) {
                this.set('hidden', false);
            }
        }

        window.customElements.define(HideableElement.is, HideableElement);
    </script>
</dom-module>
```
