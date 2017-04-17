---
date: 2017-04-14T16:38:32+02:00
title: Firing events
weight: 300
---
Elements use events to communicate state changes up the DOM tree to parent elements. 
Polymer elements can use the standard DOM APIs for creating, dispatching, and listening for events.

FBP also provides a notation for events (bubbling [**^^e**] and non bubbling [**^e**]), which allow you to specify events  declaratively.

On the first view, it does not make a lot sense to *rename* events. But imagine a simple controller component with 3 buttons labeled with play, pause and next. It is much easier to wire @-play, @-next and @-pause then just the @-tap. The @-tap can come from each button and you have to find out which button was pressed.   

## Non bubbling events
Non bubbling events will stop at the next dom parent.

**non bubbling example**
```html
 ...
  <iron-ajax 
    ƒ-generate-request="--deleteClicked" 
    url="https://www.googleapis.com/youtube/v3/search"
    params='{"part":"snippet", "q":"polymer", "key": "YOUTUBE_API_KEY", "type": "video"}'
    handle-as="json"
    @-response="^data-received"
    debounce-duration="300"></iron-ajax> 
```
*when iron-ajax fires the **response** event, the **data-received** event will be fired*


With "^event(propertyName)" you can send a data with the event.

**non bubbling event with custom data**
```html
  ...
   <paper-button @-tap="^some-event(_privateProperty)"> check </paper-button> 
  ...
```
    
    
## bubbling events
To fire a bubbling-event use **^^event-name**.


## sending host data with events
