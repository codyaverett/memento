---
name: Data Streams Vs Buffers
created: 2022-10-07T20:11:20-05:00
updated: 2022-11-21T03:03:40-06:00
aliases: 
tags: concept, stream, buffer
---
# Data Streams Vs Buffers

- Buffers process data at the expense of system memory
- Streams process data as it is received which reduces the memory overhead for each

## Streaming Challenges
- If the producer streams more data than the consumer can process in a span of time, the consumer will start to take up memory
- If a consumer system dies in the middle of a data stream you'd need to have a way to start the process back up without duplicating work
- Too many producers/consumers can turn the system into a tightly coupled monolith

## Streaming is Amazing Though
- "Perhaps it’s not surprising that when streams become the center of the world, everything is streamlined."
- 

## Reference
- [Redis vs Kafka Ebook](https://redis.com/wp-content/uploads/2022/06/EBOOK-Streams-Redis-Streams-and-Kafka-20220615.pdf?li_fat_id=56ba72db-8324-4842-a9b5-2d2382b6fefb)