---
name: Clean Python Sorting
created: 2022-10-18T18:22:18-05:00
updated: 2022-11-28T17:52:55-06:00
aliases: 
tags: python, sort
---
# Clean Python Sorting

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
