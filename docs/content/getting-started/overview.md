---
date: 2016-03-09T00:11:02+01:00
title: Getting started
weight: 100
---

## Installation

Before you can use the flowbased-polymer behavior you need to install it in your project.

```sh
bower install flowbased-polymer --save
```

### Import the behavior in your component

```html
<link rel="import" href="../bower_components/flowbased-polymer/behaviour.html">
```


Add the behaviour to your component

**Polymer 1.x**
```javascript

{
    behaviors: [Polymer.FlowBasedProgramming]
}

```

**Polymer 2.x**
``` 
  <script>

    class MyComponent extends Polymer.mixinBehaviors([ Polymer.FlowBasedProgramming], Polymer.Element){
      static get is() { return 'my-view1'; }
    }
    window.customElements.define(MyComponent.is, MyComponent);

  </script>

```


{{<note title="Tipp">}}
Do not forget to import and define the behaviour. It is a common pitfall to forget the definition or the import in the component you are writing. 
{{</note >}}
