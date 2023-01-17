---
name: Ema Ribbons
created: 2023-01-16T22:10:00-06:00
updated: 2023-01-16T22:27:51-06:00
aliases: 
tags: 
---
# Ema Ribbons

```javascript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © codyaverett

//@version=5
strategy("EMA wide band", overlay=true)

ema200 = ta.sma(close, 200)
ema55 = ta.sma(close, 55)
ema22 = ta.sma(close, 22)

// Plots
plot(ema200, color=color.rgb(233, 65, 65), linewidth=3)
plot(ema55, color=color.rgb(0, 215, 252), linewidth=2)
plot(ema22, color=color.yellow, linewidth=1)
```

## 4 Ema
```javascript
strategy(title="4EMA", shorttitle="4EMA", overlay = true )
Length1 = input.int(8, minval=1)
Length2 = input.int(13, minval=1)
Length3 = input.int(21, minval=1)
Length4 = input.int(55, minval=1)
xPrice = close
xEMA1 = ta.ema(xPrice, Length1)
xEMA2 = ta.ema(xPrice, Length2)
xEMA3 = ta.ema(xPrice, Length3)
xEMA4 = ta.ema(xPrice, Length4)
plot(xEMA1, color=color.blue, title="4EMA 8")
plot(xEMA2, color=color.green, title="4EMA 13")
plot(xEMA3, color=color.yellow, title="4EMA 21")
plot(xEMA4, color=color.red, title="4EMA 55", linewidth=4)
```