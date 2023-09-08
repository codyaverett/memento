---
name: local ollama llm api
created: 2023-09-07T23:13:27-05:00
updated: 2023-09-07T23:13:34-05:00
aliases: 
tags: llm, ai
---
# local ollama llm api

Clone project and build the project locally

https://github.com/jmorganca/ollama

## Set up an nginx reverse proxy

```nginx
caavere@starbase:~/Projects/ollama$ cat /etc/nginx/sites-enabled/api-proxy

server {
    listen 8080;
    server_name starbase;

    location / {
        proxy_pass http://127.0.0.1:11434/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Download and run a model.
`./ollama pull llama2`
`./ollama serve`

~/Projects/rust » curl -X POST http://100.88.229.68:8080/api/generate -d '{ "model": "llama2", "prompt": "Why is the sky blue?" }'                7 ↵ caavere@Codys-MacBook-Pro