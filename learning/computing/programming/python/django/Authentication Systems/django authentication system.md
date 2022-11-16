---
created: 2022-11-16T15:11:31-06:00
updated: 2022-11-16T15:11:31-06:00
---
# Django authentication system

## Tables
- auth_group
- auth_group_permissions
- auth_permissions
- auth_user
- auth_user_groups
- auth_user_user_permissions

## Tables
### User Table
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

## User profiles
Extend or compose new profiles 

Extending the user model