---
aliases: 
tags: 
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T16:49:15-06:00
name: sed examples to print lines from a file
---
# sed examples to print lines from a file
```toc
```

## Let Us Consider a File with the Following Contents:

```
$ cat file
AIX
Solaris
Unix
Linux
HPUX
```

## Print Only the First Line of the File

```shell
$ sed -n '1p' file
AIX
```

Similarly, to print a particular line, put the line number before 'p'.  
  
## Print Only the Last Line of the File

```shell
$ sed -n '$p' file
HPUX
```

 $ indicates the last line.  
  
## Print Lines Which Does Not Contain 'X'

```shell
$ sed -n '/X/!p' file
Solaris
Unix
Linux
```

  !p indicates the negative condition to print.  
## Print Lines Which Contain the Character 'u' or 'x'


```shell
$ sed -n '/[ux]/p' file
Unix
Linux
```

  [ux] indicates line containing the pattern either 'u' or 'x'.  
  
## Print Lines Which End with 'x' or 'X'

```shell
$ sed -n '/[xX]$/p' file
AIX
Unix
Linux
HPUX
```


## Print Lines Beginning with Either 'A' or 'L'

```shell
$ sed -n '/^A\|^L/p' file
AIX
Linux
```

  The pipe is used to provide multiple pattern matching. Like this, multiple patterns can be provided for searching.  
  
## Print Every Alternate Line

```shell
$ sed  'n;d' file
AIX
Unix
HPUX
```

  n command prints the current line, and immediately reads the next line into pattern space. d command deletes the line present in pattern space. In this way, alternate lines get printed.
  
## Print Every 2 Lines


```shell
$ sed  'n;n;N;d' file
AIX
Solaris
HPUX
```


   n;n; => This command prints 2 lines and the 3rd line is present in the pattern space. N command reads the next line and joins with the current line, and d deltes the entire stuff present in the pattern space. With this, the 3rd and 4th lines present in the pattern space got deleted. Since this repeats till the end of the file, it ends up in printing every 2 lines.  
   
## Print Lines Ending with 'X' Within a Range of Lines

```shell
$ sed -n '/Unix/,${/X$/p;}' file
HPUX
```

  The range of lines being chosen are starting from the line containing the pattern 'Unix' till the end of the file($). The commands present within the braces are applied only for this range of lines. Within this group, only the lines ending with 'x' are printed. Refer this to know [how to print a range of lines using sed](http://www.theunixschool.com/2011/09/sed-selective-printing.html) from example 5 onwards.
  
## Print Range of Lines Excluding the Starting and Ending Line of the Range

```shell
$ sed -n '/Solaris/,/HPUX/{//!p;}' file
Unix
Linux
```

  The range of lines chosen is from 'Solaris' to 'HPUX'. The action within the braces is applied only for this range of lines. If no pattern is provided in pattern matching (//), the last matched pattern is considered. For eg, when the line containing the pattern 'Solaris' matches the range of lines and gets inside the curly braches, since no pattern is present, the last pattern (solaris) is matched. Since this matching is true, it is not printed(!p), and the same becomes true for the last line in the group as well.