---
aliases: 
tags: 
created: 2022-10-22T02:21:39-05:00
updated: 2022-11-16T16:51:04-06:00
name: nginx reverse proxy
---
# Nginx Reverse Proxy

## nginx.conf
```nginx
# For more information on configuration, see:
# * Official English Documentation: http://nginx.org/en/docs/
# * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

  
# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
# include /usr/share/nginx/modules/*.conf;

events {
	worker_connections 1024;
}

stream {
	upstream postgres {
		server localhost:5432;
	}
	server {
		listen 5432 so_keepalive=on;
		proxy_pass postgres;
	}
}

  

http {

	log_format main '$remote_addr - $remote_user [$time_local] "$request" '
	
	'$status $body_bytes_sent "$http_referer" '
	
	'"$http_user_agent" "$http_x_forwarded_for"';

	access_log /var/log/nginx/access.log main;	  
	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 4096;

	include /etc/nginx/mime.types;

	default_type application/octet-stream;

	# Load modular configuration files from the /etc/nginx/conf.d directory.
	# See http://nginx.org/en/docs/ngx_core_module.html#include
	# for more information.
	# include /etc/nginx/conf.d/*.conf;

	server {
		listen [::]:443 ssl ipv6only=on; # managed by Certbot
		listen 443 ssl; # managed by Certbot
		ssl_certificate /etc/letsencrypt/live/averett.cloud/fullchain.pem; # managed by Certbot
		ssl_certificate_key /etc/letsencrypt/live/averett.cloud/privkey.pem; # managed by Certbot
		include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
		ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
		server_name averett.cloud;
		root /usr/share/nginx/html;
		
		# Load configuration files for the default server block.
		# include /etc/nginx/default.d/*.conf;

		error_page 404 /404.html;
		location = /404.html {
		}

		error_page 500 502 503 504 /50x.html;
		location = /50x.html {
		}
	}

  

# Settings for a TLS enabled server.

#

# server {

# listen 443 ssl http2;

# listen [::]:443 ssl http2;

# server_name _;

# root /usr/share/nginx/html;

#

# ssl_certificate "/etc/pki/nginx/server.crt";

# ssl_certificate_key "/etc/pki/nginx/private/server.key";

# ssl_session_cache shared:SSL:1m;

# ssl_session_timeout 10m;

# ssl_ciphers PROFILE=SYSTEM;

# ssl_prefer_server_ciphers on;

#

# # Load configuration files for the default server block.

# include /etc/nginx/default.d/*.conf;

#

# error_page 404 /404.html;

# location = /40x.html {

# }

#

# error_page 500 502 503 504 /50x.html;

# location = /50x.html {

# }

# }

}
```

## Server Configs

```nginx

# Complete Nginx Docker reverse proxy config file

server {

	server_name etl.cody.averett.cloud;
	listen [::]:443 ssl; # managed by Certbot
	listen 443 ssl; # managed by Certbot
	ssl_certificate /etc/letsencrypt/live/etl.cody.averett.cloud/fullchain.pem; # managed by Certbot
	ssl_certificate_key /etc/letsencrypt/live/etl.cody.averett.cloud/privkey.pem; # managed by Certbot
	include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
	ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
	
	location ^~ /airflow {
		proxy_pass http://localhost:8080;
		proxy_set_header Host $host;
		proxy_redirect off;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}
	
	location /analytics {
		proxy_set_header Host $host;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Script-Name /analytics;
		proxy_pass http://localhost:8088;
		proxy_redirect off;
	}
	
	location ~ ^/(static|superset|sqllab|savedqueryview|druid|tablemodelview|databaseasync|dashboardmodelview|slicemodelview|dashboardasync|druiddatasourcemodelview|api|csstemplateasyncmodelview|chart|savedqueryviewapi|r|datasource|sliceaddview) {
	
	try_files $uri /analytics/$uri /analytics/$uri?$query_string @rules;
	
	}
	
	location @rules {
		# adapt "http://localhost" with your url
		return 308 https://etl.cody.averett.cloud/analytics$uri$is_args$query_string;
	
	}
	
	location ^~ /pgadmin {
		proxy_pass http://localhost:5050;	
		proxy_set_header X-Script-Name /pgadmin;
		proxy_set_header Host $host;
		proxy_redirect off;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}
	
	error_page 500 502 503 504 /50x.html;
	location = /50x.html {
		root /usr/share/nginx/html;
	}
}
```