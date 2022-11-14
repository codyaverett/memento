# Reserved slots in python formatted strings

```python
text = 'EPIC'

print(f'{text}') # EPIC

print(f'{text}:#<20') # 20 chars but the last chars are #s EPIC################

print(f'{text}:_>20') # 20 chars but first chars are _s    ________________EPIC

print(f'{text}:.^20') # 20 chars, but centered and surrounded by .s ........EPIC.........

```

