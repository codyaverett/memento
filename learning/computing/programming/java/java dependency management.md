---
language: java
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T15:11:30-06:00
---

# Maven

## Generating a maven POM file

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