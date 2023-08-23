---
name: Jenkins
created: 2023-08-22T22:32:43-05:00
updated: 2023-08-22T22:37:37-05:00
aliases: 
tags: 
---
# Jenkins

## Testing Jenkins Locally

Testing a JenkinsFile or groovy scripts meant for being run in a CI environment

- [Run pipeline with replay](https://stackoverflow.com/questions/36309063/how-can-i-test-a-change-made-to-jenkinsfile-locally) (not really what I am looking for)
- [Install Jenkins-cli.jar](https://linuxhint.com/test-jenkinsfile-locally/) (warmer)
  ![[Pasted image 20230822223631.png]]

## Linting a Jenkinsfile From the Command Line

```shell
java -jar jenkins-cli.jar -s JENKINS_URL -webSocket declarative-linter < Jenkinsfile
```

With auth

```shell
java -jar jenkins-cli.jar -s JENKINS_URL -auth username:password -webSocket declarative-linter < Jenkinsfile
```

