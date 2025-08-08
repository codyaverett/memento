# Volume and DB backups

If your main objective is backing up containers, I would suggest to use podman tools to export the volumes and databases. You can then copy the .tar and .sql archives anywhere, using any tool.

Let’s assume your external drive is mounted here: /mnt/backup

Some examples below:

```bash
# Backing up volumes:
podman volume export -o=/mnt/backup/<volume-name>.tar <volume name>

# Restoring volumes:
podman volume import <volume-name> /mnt/backup/<volume-name>.tar
```

DB specific

```bash
Backing up a mariadb database:
podman exec <container-name> sh -c 'exec mariadb-dump <database-name> -uroot -p"$MARIADB_ROOT_PASSWORD"' > /mnt/backup/<database-name>.sql

Restoring a mariadb database:
podman exec -i <container-name> sh -c 'exec mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" <database-name>' < /mnt/backup/<database-name>.sql

Backing up a postgres database:
podman exec <container-name> sh -c 'exec pg_dumpall -c -U $POSTGRES_USER' > /mnt/backup/<database-name>.sql

Restoring a postgress database:
podman exec -i <container-name> sh -c 'exec psql -U $POSTGRES_USER -d <database-name>' < /mnt/backup/<database-name>.sql
```
