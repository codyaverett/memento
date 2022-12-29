---
name: request routing
created: 2022-12-28T20:42:19-06:00
updated: 2022-12-28T20:50:18-06:00
aliases: 
tags: discovery, routing, distributed
---
# Request Routing

There are several methods one could take to distribute a dataset or application across multiple nodes.

1. Allow clients to contact any node
	1. If that node owns the resources that are being requested, they can handle it
	2. otherwise they pass the message to the node that can service the request
2. Send all requests from client to router tier first
	1. The routers should handle each request and forward it accordingly
	2. The routers only handle message routing, they don't service any of the requests themselves
3. Require clients to be aware of which nodes they should request various resources from

There are probably other patterns you could think up, but these are the most general cases.

There could also be situations where you might want to adapt to use a few of these patterns together.  e.g. 1 and 3 as an attempt to reduce network overhead.
