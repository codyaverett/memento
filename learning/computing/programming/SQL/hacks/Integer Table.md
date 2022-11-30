---
name: Integer Table
created: 2022-11-29T22:46:08-06:00
updated: 2022-11-29T22:55:48-06:00
aliases: 
tags: sql, hack
---
# Integer Table

An Integer table should have a single column called `i` that is also the  `primary key`

```sql
CREATE TABLE integers
(i INTEGER NOT NULL PRIMARY KEY);

-- Generate data
INSERT INTO integers (i) VALUES (0),(1),(2),(3),(4),(5),(6),(7),(8),(9);
```

If the above syntax is not available in your database use the following
```sql
INSERT INTO integers (i) VALUES (0);
```

## Generate Sequential Data


### Numbers 0-99

Join the table to itself to generate more numbers

```sql

-- Multiply the first digits by 10
-- Then add 0..9 to each of the multiples of 10

SELECT 10*t.i+u.i AS number
	FROM integers AS u
CROSS
	JOIN integers AS t
ORDER
	BY number;
```

If cross joins aren't available in your database use this instead
```sql
SELECT 10*t.i+u.i AS number
	FROM integers AS u
		, integers AS t
ORDER
	BY number;
```