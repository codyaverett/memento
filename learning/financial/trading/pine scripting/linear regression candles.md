---
name: linear regression candles
created: 2023-01-16T22:59:09-06:00
updated: 2023-01-16T22:59:24-06:00
aliases: 
tags: 
---
# Linear Regression Candles

```javascript
//@version=4
study(title="Humble LinReg Candles", shorttitle="LinReg Candles", format=format.price, precision=4, overlay=true)

signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 200, defval = 11)
sma_signal = input(title="Simple MA (Signal Line)", type=input.bool, defval=true)

lin_reg = input(title="Lin Reg", type=input.bool, defval=true)
linreg_length = input(title="Linear Regression Length", type=input.integer, minval = 1, maxval = 200, defval = 11)

bopen = lin_reg ? linreg(open, linreg_length, 0) : open
bhigh = lin_reg ? linreg(high, linreg_length, 0) : high
blow = lin_reg ? linreg(low, linreg_length, 0) : low
bclose = lin_reg ? linreg(close, linreg_length, 0) : close

r = bopen < bclose

signal = sma_signal ? sma(bclose, signal_length) : ema(bclose, signal_length)

plotcandle(r ? bopen : na, r ? bhigh : na, r ? blow: na, r ? bclose : na, title="LinReg Candles", color= color.green, wickcolor=color.green, bordercolor=color.green, editable= true)
plotcandle(r ? na : bopen, r ? na : bhigh, r ? na : blow, r ? na : bclose, title="LinReg Candles", color=color.red, wickcolor=color.red, bordercolor=color.red, editable= true)

plot(signal, color=color.white)
```