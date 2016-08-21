# \<flowbased-behaviour\> for Polymer ^1.4.0

Connect events from components to functions of other components, to properties or trigger (basic) events  of other components in a declarative way.


Installation:
```
bower install flowbased-behaviour --save
```

<h3>Demo and detailed Documentation</h3>

[DEMO and Documentation](https://veith.github.io/flowbased-behaviour/components/flowbased-behaviour/)

<h3>Usage</h3>
```
<link rel="import" href="../../bower_components/flowbased-behaviour/behaviour.html">

```
 - add behaviour to your component **behaviors: [PolymerFlowBasedProgramming,...]**.

 - add a ```@-event-name="connector"``` or  ```@-event-name="((property))"``` to the emmiting component.

 - add a ```ƒ-function-name="connector"``` or ```ƒ-event-name="connector"``` to the receiving component(s).


The content of **event.detail** will be passed to the receiver function and to the property.

<h3>Attention</h3>
Keep in mind that the "ƒ" symbol is not a regular "f". Press [alt] + f on mac.

<h3>example</h3>
```
<emmiting-component @-response="((responseFromSomewhere))"></emmiting-component>
<emmiting-component @-response="otherResponse"></emmiting-component>

<receiving-component ƒ-show-data="otherResponse"></receiving-component>
{{responseFromSomewhere}}

```

Exapmple above is aequivalent to following example

```
<emmiting-component id="emmiter" on-response="handleResponseFromSomewhere"></emmiting-component>
<emmiting-component id="emmiterB" on-response="handleOtherResponseFromSomewhere"></emmiting-component>

<receiving-component id="receiver"></receiving-component>
{{responseFromSomewhere}}

Polymer({
    is: 'my-component',
    properties: {
        responseFromSomewhere:{
            type: String,

        }
    },
    handleResponseFromSomewhere:function(event){
        this.set(responseFromSomewhere, event.detail);
    },
    handleOtherResponseFromSomewhere:function(event){
        this.$.receiverB.showData(event.detail);
    }

});

```



