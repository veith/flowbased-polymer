---
date: 2017-04-17T14:02:04+02:00
title: Best practice
weight: 600
---
The best practices are a result from the feedback of our users, thanks to them.

Feel free to give us your feedback.
 
## Wire and event naming
 In fact you can use any string to name wires, but most of the users are using two dashes in front of the wire name and for the name they use camelCase notation.
 
For the events they use the dashed-case notation, because the behavior does not convert the camelCase for the event to dash-case notation, which you will need to wire the event in another component.

```html
<paper-button @-tap="--buttonTapped, ^^fired-event"></paper-button>
```
With this notation they can see the difference between a **wire** to an **event** they fire directly.


## Use declarative wire names, don't be imperative

When you use declarative names, it would be easier to read and modify a wired program.

**bad example**
```html
<paper-button @-tap="--closeView"></paper-button>
<my-view ƒ-close="--closeView"></my-view>
<data-component ƒ-save="--closeView"></data-component>
```

**good example**
```html
<paper-button @-tap="--closeButtonTapped"></paper-button>
<my-view ƒ-close="--closeButtonTapped"></my-view>
<data-component ƒ-save="--closeButtonTapped"></data-component>
```

*It is a subtile but relevant difference between this two examles.*

## Use *event delegation*
When you use a set of components, you don't have to wire every single component to the appropriate target. Use *event delegation* whenever possible. It is faster and easier to read.

 

 
**without event delegation**
![without event delegation](/images/withoutEventDelegation.png)
```html
    <div >
      <mole-hole key="a" @-closed="--moleClosed" @-continue="--continue" @-miss="--missed" @-whack="--whacked"></mole-hole>
      <mole-hole key="s" @-closed="--moleClosed" @-continue="--continue" @-miss="--missed" @-whack="--whacked"></mole-hole>
      <mole-hole key="d" @-closed="--moleClosed" @-continue="--continue" @-miss="--missed" @-whack="--whacked"></mole-hole>
      <mole-hole key="f" @-closed="--moleClosed" @-continue="--continue" @-miss="--missed" @-whack="--whacked"></mole-hole>
      <mole-hole key="g" @-closed="--moleClosed" @-continue="--continue" @-miss="--missed" @-whack="--whacked"></mole-hole>
      <mole-hole key="w" @-closed="--moleClosed" @-continue="--continue" @-miss="--missed" @-whack="--whacked"></mole-hole>
    </div>
```
 
**with event delegation**
![with event delegation](/images/eventDelegation.png)
```html
    <div @-closed="--moleClosed" @-continue="--continue" @-miss="--missed" @-whack="--whacked">
      <mole-hole key="a"></mole-hole>
      <mole-hole key="s"></mole-hole>
      <mole-hole key="d"></mole-hole>
      <mole-hole key="f"></mole-hole>
      <mole-hole key="g"></mole-hole>
      <mole-hole key="w"></mole-hole>
    </div>
```




