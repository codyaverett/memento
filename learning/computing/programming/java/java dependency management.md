---
aliases: 
tags: 
created: 2022-11-14T23:36:08-06:00
updated: 2022-11-16T16:51:05-06:00
name: Maven
---

# Maven

## Generating a Maven POM File

```shell
mvn org.apache.maven.plugins:maven-install-plugin:3.0.1:install-file \
  -Dfile=path-to-your-artifact-jar \
  -DgroupId=your.groupId \
  -DartifactId=your-artifactId \
  -Dversion=version \
  -Dpackaging=jar \
  -DgeneratePom=true
```


[[java programming language]]