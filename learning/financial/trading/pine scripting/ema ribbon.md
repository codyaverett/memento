---
name: Ema Ribbon
created: 2023-01-16T22:10:00-06:00
updated: 2023-01-16T22:12:35-06:00
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

## 4 ema
```javascript
study(title="4EMA", shorttitle="4EMA", overlay = true )
Length1 = input(8, minval=1)
Length2 = input(13, minval=1)
Length3 = input(21, minval=1)
Length4 = input(55, minval=1)
xPrice = close
xEMA1 = ema(xPrice, Length1)
xEMA2 = ema(xPrice, Length2)
xEMA3 = ema(xPrice, Length3)
xEMA4 = ema(xPrice, Length4)
plot(xEMA1, color=blue, title="4EMA 8")
plot(xEMA2, color=green, title="4EMA 13")
plot(xEMA3, color=yellow, title="4EMA 21")
plot(xEMA4, color=red, title="4EMA 55", linewidth=4)

```