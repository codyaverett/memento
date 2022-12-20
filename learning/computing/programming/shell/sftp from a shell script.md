---
name: Sftp From a Shell Script
created: 2022-12-19T18:47:52-06:00
updated: 2022-12-19T18:48:50-06:00
aliases: 
tags: shell, ftp, sftp
---
# Sftp From a Shell Script

To write a shell script that writes a SFTP script, you can follow these steps:

Start the shell script with the #!/bin/bash shebang line, which specifies the bash shell as the interpreter for the script.

Declare any necessary variables at the beginning of the script. For example, you might want to define variables for the hostname, username, and password of the remote server.

Use the echo command to write the SFTP commands to a file. For example, you might use the following commands to connect to the remote server and download a file:

```shell

echo "open sftp://$USERNAME:$PASSWORD@$HOSTNAME" > sftp-script.txt
echo "get /path/to/remote/file.txt" >> sftp-script.txt
echo "quit" >> sftp-script.txt
```

Use the sftp command to execute the SFTP script, like this:

```shell
sftp -b sftp-script.txt
```

This will connect to the remote server, download the specified file, and then disconnect.

You can also include additional SFTP commands in the script to perform other actions, such as uploading files or changing directories. For a full list of available SFTP commands, you can consult the SFTP documentation or use the help command within the SFTP client.
