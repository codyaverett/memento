---
aliases: 
tags: 
title: clean python sorting
created: 2022-10-18T18:22:18-05:00
updated: 2022-11-16T16:49:15-06:00
name: clean python sorting
---
# clean python sorting

## Example 1

```python
inventory = ['Axe', Great Sword', 'Stick']
			 
rarity = {
	'Great Sword': 98,
	'Golden Bow' 97 ,
	'Iron Sword' 80,
	'Axe': 34,
	'Stick': 1
}
			 
sort_inv = sorted (inventory, 
	key=rarity.__getitem__
	reverse = True)
	
print (sort_inv)
print(rarity.__getitem__('Stick'))
```
