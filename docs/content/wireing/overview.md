---
date: 2017-04-14T15:47:54+02:00
title: Connecting components
weight: 200
---
#### Given following example:
We have a button and some elements. We want to hide a element-to-hide, after the user presses the hide button.

When you want to this in classical polymer, you have a lot of steps to do. This is not bad, but sometimes it is just to much work. 

First you have to register on the event, then you have to assign id's to the target elements, write the function in javascript and call the function on the element you want to hide from the javascript.
 
**the classical way** 
```html
<dom-module id="hide-example">
<template>
  <button on-click="hide">hide</button>
  <element-to-hide id="target">First element to hide</element-to-hide>
</template>
  <script>
    Polymer({     
      is: 'hide-example',
      //hide element-to-hide
      hide:function() {       
        this.$.target.hide();
      }
    });
  </script>
</dom-module>

```
 
 This example is not a problem to keep track of, but it becomes then a problem when you have a lot of elements where multiple sources will address multiple targets. You will end up with a lot of *boilerplate* code which just do some trivial tasks.

## Connecting things

The same example as above, but with flowbased-polymer behaviour will look like this. 

![hide example](/images/hideExample.png)

**the flowbased way** 
```html
<dom-module id="hide-example">
<template>
  <button @-click="--hideClicked">hide</button>
  <element-to-hide ƒ-hide="--hideClicked">First element to hide</element-to-hide>
</template>
  <script>
    Polymer({     
      is: 'hide-example',
      behaviors: [Polymer.FlowBasedProgramming]
    });
  </script>
</dom-module>

```
This doesnt look very impressive in the first moment. But when you look at the *element-to-hide* component in the first example, how do you know when the hide function will be triggered? You have to read the source to find it out. What will happen when the id changes? What do you do if you have a second target to hide? 

{{<note title="Note">}}
The ƒ-function will be called with **event.detail** as an argument. 
More on this you can read in section  [passing data](#passing-data)
{{</note >}}


## Multiple targets
A wire can have multiple targets. The **--hideClicked** wire from above can trigger multiple elements if you want.

![Multiple targets](/images/multipleTargets.png)

```html
<template>
  <button @-click="--hideClicked">hide</button>
  <element-to-hide ƒ-hide="--hideClicked">element to hide</element-to-hide>
  <element-to-hide ƒ-hide="--hideClicked">other element to hide</element-to-hide>
  <element-to-show ƒ-show="--hideClicked">other element to hide</element-to-show>
</template>
```
if you press the button, all elements which are connected to the wire will trigger the defined function. In this example the first to will call the hide and the third element will call the show function.

## Multiple sources
A wire can also have multiple sources. 
![Multiple sources](/images/multipleSources.png)
```html
<template>
  <button @-click="--hideClicked">hide</button>
  <element-to-hide ƒ-hide="--hideClicked">element to hide</element-to-hide> 
  <button @-click="--hideClicked">other hide</button>
</template>
```
It doesn't matter if you press the first or the second hide button. Both will trigger the wire **--hideClicked**.

## Multiple sources and targets 
A wire can also have multiple sources and targets.

![Multiple sources and targets](/images/multiSourceAndTarget.png)
```html
  <template>
    <button @-click="--hideClicked">hide</button>
    <element-to-hide ƒ-hide="--hideClicked">element to hide</element-to-hide>
    <element-to-hide ƒ-hide="--hideClicked">other element to hide</element-to-hide>
    <element-to-show ƒ-show="--hideClicked">other element to hide</element-to-show>
    <button @-click="--hideClicked">other hide</button>
  </template>
```

  
  
## Multiple wires from source
You can trigger multiple wires from one source by comma separating them.

![Multiple wires from source](/images/multiWireFromSource.png)
*the black wire is --otherIntention*

```html
<template>
  <button @-click="--hideClicked,--otherIntention">hide</button>
  <element-to-hide ƒ-hide="--hideClicked">element to hide</element-to-hide>
  <element-to-hide ƒ-hide="--hideClicked">other element to hide</element-to-hide>
  <element-to-show ƒ-show="--otherIntention"> element to show</element-to-show>
</template>
```
If you press the button, it will trigger the **--hideClicked** and **--otherIntention** wire *(in black)*.
 
## Multiple wires to target
You can receive from multiple wires by comma separating them.

![Multiple wires to target](/images/mwTarget.png)

```html
<template>
  <button @-click="--hideClicked">hide</button>
  <placeholder-element ƒ-hide="--hideClicked,--contentLoaded">element to hide</placeholder-element>
  <element-to-hide ƒ-hide="--hideClicked">other element to hide</element-to-hide>
  <main-content @-ready="--contentLoaded" data="[[_content]]"></main-content>
</template>
```
The hide function of the placeholder-element will be triggered when --hideClicked or --contentLoaded will be fired. 
 

## Passing data
Normally the **event.detail** is passed to the function you wire. But sometimes you want an event as trigger and another property then event.detail as payload. 
You have several ways to accomplish this task.
 
 **inject the property at the wire source**

```html
   <paper-button @-tap="--wireWithProerty(_myProp)"> Press this </paper-button>
   <other-component ƒ-demo="--wireWithProerty"></other-component>
```
_myProp is a normal polymer property.

**using a component to replace event.detail with a property**

![replace data](/images/replaceData.png)

```html
   <paper-button @-tap="--buttonPressed"> Press this </paper-button>
   <replace-detail data="[[_myProp]]" ƒ-in="--buttonPressed" @-out="--wireWithProerty"></replace-detail>
   <other-component ƒ-demo="--wireWithProerty"></other-component>
```



## Multiple arguments
In some rare conditions, the functions you want to call, need more then one argument. In this case you can pass in an array of arguments to the function.  

```html
  ...
   <multiply-values ƒ-calculate="--wireWithArray" result="{{_result}}"></multiply-values>
   <paper-button @-tap="--wireWithArray(_values)"> calculate </paper-button> 
  ...
  ...
  ,properties:{
      _values:{
      type:Array,
      value:[3,2]
      }
  }
```

## Handling responses from functions
When you wire a ƒ-function, a non bubbling event *ƒ-function* with the response value in event.detail will be fired. 
There is no difference to another fired event. You can fire another event, which eventually bubbles, store the response to a property, wire it,...   
  
You can receive and rewire the response from a function with **@-ƒ-functionname="...""**. 
```html
  ...
   <paper-button @-tap="--wireWithArray(_values)"> calculate </paper-button>
    
   <multiply-values ƒ-calculate="--wireWithArray" @-ƒ-calculate="--calculated"></multiply-values>
   <multiply-values ƒ-calculate="--wireWithArray" @-ƒ-calculate="((_result))"></multiply-values>
  ...
  ...
  ,properties:{
      _values:{
      type:Array,
      value:[3,2]
      },
      _result:{
      type:Number
      }
  }
```
* When you press the button, both multiply-values.calculate functions are called. The first one will trigger the wire --calculated, the second one will
write the response to the property _result.*
