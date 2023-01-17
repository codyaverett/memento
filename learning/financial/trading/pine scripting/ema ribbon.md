---
name: Ema Ribbon
created: 2023-01-16T22:10:00-06:00
updated: 2023-01-16T22:12:35-06:00
aliases: 
tags: 
---
# Ema Ribbon

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