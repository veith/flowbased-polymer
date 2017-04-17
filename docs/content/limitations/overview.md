---
date: 2017-04-14T16:49:27+02:00
title: Limitations
weight: 500
---

You can not use the FBP syntax in a template tag (```<template is="dom-repeat">```). It is not reachable for the behavior :-( .

 **Workaraound** 
```html
<div @-click="--elementClicked">
    <template is="dom-repeat" items="[[list]]">
        <paper-button>[[item.name]]</paper-button>
    </template>
</div>
```
*Use "event-delegation" and add a additional container around the template tag and wire your elements there.*


