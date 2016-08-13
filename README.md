# \<flowbased-behaviour\> for Polymer ^1.4.0

Connect events from components to functions of other components, to properties or trigger (basic) events  of other components in a declarative way.


Installation:
```
bower install veith/flowbased-behaviour --save
```

Usage:

```
<link rel="import" href="../../bower_components/flowbased-behaviour/behaviour.html">

```
 - add behaviour to your component **behaviors: [PolymerFlowBasedProgramming,...]**.

 - add a ```@ƒ-<event>="<connector/property>"``` to the emmiting component.
 - add a ```ƒ-<function/event>="<connector/property>"``` to the receiving component.

The content of **event.detail** will be passed to the receiver function and to the property <connector/property>

<h3>Attention</h3>
Keep in mind that the "ƒ" symbol is not a regular "f". Press [alt] + f on mac.

<h3>example</h3>
```
<emmiting-component @ƒ-response="responseFromSomewhere"></emmiting-component>
<receiving-component ƒ-show="responseFromSomewhere"></receiving-component>
{{responseFromSomewhere}}

```

Exapmple above is aequivalent to following example

```
<emmiting-component id="emmiter" on-response="handleResponseFromSomewhere"></emmiting-component>
<receiving-component id="receiver"></receiving-component>

Polymer({
    is: 'my-component',
    properties: {
        responseFromSomewhere:{
            type: String,

        }
    },
    handleResponseFromSomewhere:function(event){
        this.$.receiver.show(event.detail);
        this.set(responseFromSomewhere, event.detail);
    }

});

```


