# Django authentication system

## Tables
- auth_group
- auth_group_permissions
- auth_permissions
- auth_user
- auth_user_groups
- auth_user_user_permissions


## User Table
- id
- password - encrypted hash
- last_login
- is_supervisor - All privelages
- username
- first_name
- last_name
- email
- is_staff - can user log into admin panel
- is_active - 
- date_joined