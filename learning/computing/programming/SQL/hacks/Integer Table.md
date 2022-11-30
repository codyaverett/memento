---
name: Integer Table
created: 2022-11-29T22:46:08-06:00
updated: 2022-11-29T23:26:48-06:00
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
INSERT INTO integers (i) VALUES (1);
INSERT INTO integers (i) VALUES (2);
INSERT INTO integers (i) VALUES (3);
INSERT INTO integers (i) VALUES (4);
INSERT INTO integers (i) VALUES (5);
INSERT INTO integers (i) VALUES (6);
INSERT INTO integers (i) VALUES (7);
INSERT INTO integers (i) VALUES (8);
INSERT INTO integers (i) VALUES (9);
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

### Letters A-Z

You can use integer tables to generate the alphabet
```sql
SELECT SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZ'
			, FROM 10*t.i+u.i FOR 1) AS letter
	FROM integers u
CROSS
	JOIN integers t
WHERE 10*t.i+u.i BETWEEN 1 AND 26
ORDER
	BY letter;
```

#### SQL Server and Sqlite
```sql
SELECT SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZ'
			, 10*t.i+u.i, 1) AS letter
	FROM integers u
CROSS
	JOIN integers t
WHERE 10*t.i+u.i BETWEEN 1 AND 26
ORDER
	BY letter;
```

### Date Ranges

#### SQL Server

```sql
SELECT GETDATE() --CURRENT_DATE
		+ 10*t.i+u.i AS next_30_dates
	FROM integers u
CROSS
	JOIN integers t
WHERE 10*t.i+u.i BETWEEN 0 AND 29
ORDER
	BY next_30_dates;
```

#### Sqlite

- Adding dates in sqlite is different, [see: add days to a date in sqlite](https://database.guide/add-days-to-a-date-in-sqlite/)

```sql
SELECT Date()
		+ 10*t.i+u.i AS next_30_dates
	FROM integers u
CROSS
	JOIN integers t
WHERE 10*t.i+u.i BETWEEN 0 AND 29
ORDER
	BY next_30_dates;
```