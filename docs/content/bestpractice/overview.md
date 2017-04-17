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
With this notation they can see the difference from a **wire** to an **event** they fire directly.
