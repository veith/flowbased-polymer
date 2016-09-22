# \<flowbased-polymer\> for Polymer ^1.4.0

Do flowbased programming with polymer.

Connect events from components to functions of other components, properties. Trigger events,...  in a flowbased way.


Installation:
```
bower install flowbased-behaviour --save
```

<h3>Demo and detailed Documentation</h3>

[DEMO and Documentation](https://veith.github.io/flowbased-polymer/components/flowbased-polymer/)

<h3>Usage</h3>
```
<link rel="import" href="../../bower_components/flowbased-behaviour/behaviour.html">

```
- add behaviour to your component **behaviors: [PolymerFlowBasedProgramming,...]**.

 - add a ```@-event-name="connector"``` or  ```@-event-name="((property))"``` to the emmiting component.

 - add a ```ƒ-function-name="connector"``` or ```ƒ-event-name="connector"``` to the receiving component(s).

 - add a ```@-tap="^fire-event"``` to fire a non bubling event.

 - add a ```@-tap="^^fire-bubbling-event"``` to fire a  bubling event.


**generated image:**
 
 http://plantuml.com/plantuml/uml/hLPRRvim57xdLrZ9Cr42D6dwK2cXzHudTT6qjyg64y92R6PCkghQVvynX3kvh3EAPCxby_Vvs8T4i9L8SYJ2O2UH7mhmPCYPWP9zo68Yo065J8BO4W_GXq69jmy4JvdlyeWB56LfWO1tWtBXWyYjsl37g21eba74-xyZ09EXxCiVRnt7jkUDx35TpBoPrm3m-27cJC4eZ9KG_Aq8jUtbSZhDJPWpMPZdUZHH7UT-XN43bGGrn0lfIprKUaLbvFjmu6Pf6A4nNcNFXv4Zlmf8b2i1H19q954A4C51UIh7-6qNIgY1XeAprK_o--J9aIGaahPHScC7GOTyfGc88uWkJ1_AAQgiz6Yhpj8e2yqcMFqkh6FrGwnJaz88r2Z1Q9fPi9wjSnyQty_SnRqp16uFWP_3fjTXErrXD9MIivEzka1g2q4GzGQ_qc8ZI-UNfg-iOWTbA70ogPL-FikUsjAQihSZB02_iUxtcgDP-CxAmw5gxTQXwH2ed-JI-b8OA-BFxZF6Ag-kQZYwlKedmZGVX-uDndEiRdx5C06vsUKY6oI_LVQMo89iPo-kI6qp7uniAoZkR9lzJVazudM8EtG-t9wYM_twhSO6dCjkRy6PsCdaiTP7CBvRMDQdoDlzvEthoDitaBTr1GRxrjEJvNwo44w_5kSwBSuDMfnUBNHGYoHnGyA6nAVMM30kNkjCQq45iUBZFs8SROW8GEfs_ICRB1H7meYUNtKP5Fzkfcfr_jrK3VHWcbldFm7jIHod4amLJqFcfommUaHcG1Tx-uF76LD_pRXOwwoNt9_vBc8ET-qpg7y1

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



