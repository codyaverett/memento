---
title: ollama-gpu
created: 2026-07-29
updated: 2026-07-29
tags: []
type: evergreen
status: seedling
---

# Ollama gpu support

Expose gpus to container
```
docker run -d --device /dev/kfd --device /dev/dri -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```
