---
name: bull market support band
created: 2023-01-16T20:56:36-06:00
updated: 2023-01-16T20:57:16-06:00
aliases: 
tags: 
---
# Bull Market Support Band


- Two lines
- Green line represents the 20-week simple moving average
- Red line represents the 20 weeks exponential moving average

```javascript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © codyaverett

//@version=5
// Bull Market Support Band (version 5)
strategy("Bull Market Support Band", overlay=true)

// 20 Week Simple Moving Average
sma20 = ta.sma(close, 20)

// 20 Week Exponential Moving Average
ema20 = ta.ema(close, 20)

// Plots
plot(sma20, color=color.green, linewidth=2)
plot(ema20, color=color.red, linewidth=2)
```
