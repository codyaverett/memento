# Websocket in a webworker

My website makes a connection to a stream of realtime data using web sockets. The stream of data is just a series of JSON messages. In the websocket handlers, when I receive a message, I parse the JSON and add some data points to a graph.

My question is: does it make sense to move the websocket onto it's own worker thread?

At first I was thinking I could parse the JSON on its own thread and send the UI thread the deserialized object which might save some time. Unfortunately it looks like postMessage requires me to send strings. Therefore there's no benefit in parsing the JSON on its own thread.

It also doesn't seem like there'd be any benefit in receiving web socket data on its own thread -- I'd imaging the browser is already receiving the data off the wire on its own thread and delivering my javascript callback at the appropriate time.

So, given the fact that there isn't any post processing being done on the real time data receive -- it's mostly straight to UI -- does it make sense to put a websocket connection on a web worker?

## Answer

Yes, an instance where I needed to put websocket handling into a web-worker was when I needed to avoid browser thread interruptions at sensitive periods (when rendering streaming audio using Web Audio API being fed from my custom nodejs server). Every time the browser-side websocket receives a message of audio data it will interrupt browser processing with an audible krackle when rendering audio, which is fine if your app has no such extended sensitive time periods. By putting websocket management into a webworker I avoided interrupting the Web Audio API event loop. The webworker would handle the websocket incoming data which it put into a webworker side circular queue. The browser side Web Audio API event loop would tap into this webworker managed queue during its own event loop down time portion, thus avoiding any interruptions to the Wed Audio API event loop.

See corresponding repo https://github.com/scottstensland/websockets-streaming-audio

I did this work back in 2015 yet by the looks of it Web Audio API has recently acquired new tooling to handle this krackle issue https://developers.google.com/web/updates/2017/12/audio-worklet

## Reference

- https://stackoverflow.com/questions/32414718/does-putting-a-websocket-on-a-webworker-make-sense
