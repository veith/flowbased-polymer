---
date: 2017-04-14T16:38:32+02:00
title: Firing events
weight: 300
---
Elements use events to communicate state changes up the DOM tree to parent elements. 
Polymer elements can use the standard DOM APIs for creating, dispatching, and listening for events.

FBP also provides a notation for events (bubbling [**^^e**] and non bubbling [**^e**]), which allow you to specify events  declaratively.

On the first view, it does not make a lot sense to *rename* events. But imagine a simple controller component with 3 buttons labeled with play, pause and next. It is much easier to wire @-play, @-next and @-pause then just the @-tap. The @-tap can come from each button and you have to find out which button was pressed.   

[learn more about events...](https://www.polymer-project.org/2.0/docs/devguide/events)

## Non bubbling events
Non bubbling events will stop at the next dom parent.

![fire non bubbling event](/images/nonBubbling.png)
**non bubbling example**
```html
  <paper-button @-tap="--searchClicked">Search</paper-button>
    <iron-ajax
        ƒ-generate-request="--searchClicked"
        url="https://www.googleapis.com/youtube/v3/search"
        handle-as="json"
        params='{"part":"snippet", "q":"polymer", "key": "YOUTUBE_API_KEY", "type": "video"}'
        @-response="^data-received"
        debounce-duration="300">            
    </iron-ajax>
```
*when iron-ajax fires the* ***response*** *event, the* ***data-received*** *event will be fired*

    
    
## Bubbling events
To fire a bubbling-event use **^^event-name**.

![fire non bubbling event](/images/bubblingEvent.png)
```html
  <paper-button @-tap="--searchClicked">Search</paper-button>
    <iron-ajax
        ƒ-generate-request="--searchClicked"
        url="https://www.googleapis.com/youtube/v3/search"
        handle-as="json"
        params='{"part":"snippet", "q":"polymer", "key": "YOUTUBE_API_KEY", "type": "video"}'
        @-response="^^data-received"
        debounce-duration="300">            
    </iron-ajax>
```
*the* ***data-received*** *event will bubble.* 

## Sending host data with events
Sometimes you want to send some values with your event, because the default **event.detail** is not useful. You can send any documented host property with your event by giving the property name in brackets like  ^^some-event(**propertyName**) .

**bubbling event with custom data**
```html 
   <paper-button @-tap="^^some-event(_privateProperty)"> check </paper-button> 
```
*The tap event sends usually a number for the amount of taps with a certain time distance. So it will send 1 for a click, 2 for a doubleClick, 3 for a trippleClick,...*


## Sending multiple events from a single source
You can also send multiple events from a single source. 
```html 
   <paper-button @-tap="^^some-event(_privateProperty),^other-event,--chekTapped"> check </paper-button> 
```
*When the button is tapped,* ***some-event*** *and* ***other-event*** *will be fired and the wire* ***--checkTapped*** *will be triggered.* 
