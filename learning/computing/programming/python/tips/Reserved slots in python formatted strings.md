---
name: Reserved Slots in Python Formatted Strings
created: 2022-10-18T19:21:55-05:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: 
---
# Reserved Slots in Python Formatted Strings

```python
text = 'EPIC'

print(f'{text}') # EPIC

print(f'{text}:#<20') # 20 chars but the last chars are #s EPIC################

print(f'{text}:_>20') # 20 chars but first chars are _s    ________________EPIC

print(f'{text}:.^20') # 20 chars, but centered and surrounded by .s ........EPIC.........

```

