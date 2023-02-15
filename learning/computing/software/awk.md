---
name: Awk
created: 2023-02-09T22:06:01-06:00
updated: 2023-02-15T00:09:46-06:00
aliases: 
tags: text
---
# Awk

Awk is a standard Unix tool used for processing and manipulating text files.

Awk reads input files line by line, splits each line into fields, and then performs operations on those fields. It can perform tasks such as searching for specific patterns, modifying or deleting fields, calculating and aggregating data, and producing formatted reports.

Awk is known for its concise syntax and its ability to handle complex text processing tasks efficiently. It is often used in combination with other Unix tools such as sed and grep to perform advanced text processing tasks. Awk is available on most Unix-based operating systems, including Linux and macOS.

## Examples

Insert comment headers to the top of files 

```awk
#!/usr/bin/awk -f

BEGIN {
    FS = "/"
    OFS = "/"
    comment = "/* This is a long format comment */\n\n"
}

{
    if ($NF ~ /\.js$/) {
        file = $0
        system(sprintf("sed -i '1i %s' %s", comment, file))
    }
}

```

## Reference
- https://www.grymoire.com/Unix/AwkRef.html
- [How to use the awk command: 2-Minute Linux Tips](https://youtu.be/fRZvwBevctA)
- [AWK command in Unix | AWK tutorial for scripting | awk shell scripting tutorial | UNIX | linux](https://www.youtube.com/watch?v=kIEKVT1OvHU)
