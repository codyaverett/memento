---
aliases: 
tags: 
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T16:49:15-06:00
name: simple curl script
---
# simple curl script
Script used to automate using curl to request some resources

```bash
#!/bin/bash

# This script creates a user in the database.
# The script accepts one argument, the username of the user to create.
USERNAME=$1
CURRENT_USER=$(whoami)

# If username is not provided, exit
if [ -z "$USERNAME" ]; then
	echo "Usage: $0 USERNAME"
	exit 1
fi

# prompt for the password for the user.
read -s -p "Enter password for new user, $USERNAME: " PASSWORD
echo # newline  

# prompt for the email address for the user.
read -p "Enter email address for $USERNAME: " EMAIL

# Send the request to the server
curl -X POST \
-d username=$USERNAME \
-d email=$EMAIL \
-d is_staff=false \
-H 'Accept: application/json; indent=4' \
-u $CURRENT_USER \
http://127.0.0.1:9000/users/
```

```shell
#!/bin/bash

CURRENT_USER=$(whoami)
URL="http://127.0.0.1:9000/users/"
  
# curl -H 'Accept: application/json; indent=4' -u $CURRENT_USER $URL
curl -H 'Accept: application/json; indent=4' \

http://127.0.0.1:9000/users/ #| python3 -m json.tool
```