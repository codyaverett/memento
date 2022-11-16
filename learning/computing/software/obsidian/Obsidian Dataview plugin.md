---
name: Obsidian Dataview plugin
created: 2022-11-16T17:21:06-06:00
updated: 2022-11-16T17:21:29-06:00
aliases: 
tags: 
---
# Obsidian Dataview plugin

https://www.youtube.com/watch?v=JTObSymEvWA

## Annotating your notes

### with frontmatter
```python
---
date_met: 2013-20-12
tags
---
```

### with inline notes

e.g. 
`type::person`
`location::Singapore`

## Querying your notes

use dataview or dataviewjs code blocks

Support types:
- List
- Table
- Task
- Calendar

### Examples

```dataview
TABLE name, created, updated
```