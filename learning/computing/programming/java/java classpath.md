---
name: java classpath
created: 2022-12-21T22:00:18-06:00
updated: 2022-12-21T22:01:22-06:00
aliases: 
tags: java
---
# Java Classpath

In the Java programming language, the classpath is the path that the Java Virtual Machine (JVM) searches for classes and other resource files. It is used to specify the location of user-defined classes and packages. The classpath can be set using the -classpath option when starting a JVM, or it can be set through an environment variable.

Here is an example of setting the classpath when starting a JVM:

```shell
java -classpath /path/to/classes:/path/to/more/classes MyProgram
```

The classpath can also be set through an environment variable. On Windows, you can set the CLASSPATH environment variable by going to the Control Panel, selecting System, and then selecting the Advanced tab. On Linux or macOS, you can set the CLASSPATH environment variable by adding the following line to your ~/.bashrc file:

```shell
export CLASSPATH=/path/to/classes:/path/to/more/classes
```

Once the classpath has been set, you can use it to import and use classes and resources that are located in the specified paths.

```java
import mypackage.MyClass;

public class MyProgram {
  public static void main(String[] args) {
    MyClass myClass = new MyClass();
  }
}
```

