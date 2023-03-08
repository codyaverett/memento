---
name: Expect
created: 2023-03-08T00:32:08-06:00
updated: 2023-03-08T00:32:40-06:00
aliases: 
tags: 
---
# Expect

```expect
#!/usr/bin/expect -f

# Set the secret value
set secret "mysecretpassword"

# Start the CLI program
spawn cli-program

# Wait for the prompt
expect "Enter password:"

# Send the secret value to the prompt
send "$secret\r"

# Wait for the CLI program to finish
expect eof
```

This script sets the secret variable to the value of the secret you want to fill in, then uses the spawn command to start the CLI program. When the script sees the prompt "Enter password:", it uses the send command to send the secret value followed by a carriage return (\r) to fill in the prompt. Finally, the script uses the expect eof command to wait for the CLI program to finish.

Note that this is just a simple example, and the exact syntax may vary depending on the specific CLI program and prompt you're working with. You may need to adjust the script to match your particular use case.
