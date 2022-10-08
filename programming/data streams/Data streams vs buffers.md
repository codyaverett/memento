# Data streams vs buffers

- Buffers process data at the expense of system memory
- Streams process data as it is received which reduces the memory overhead for each

## Streaming challenges
- If the producer streams more data than the consumer can process in a span of time, the consumer will start to take up memory
- If a consumer system dies in the middle of a data stream you'd need to have a way to start the process back up without duplicating work

## Reference
- [Redis vs Kafka Ebook](https://redis.com/wp-content/uploads/2022/06/EBOOK-Streams-Redis-Streams-and-Kafka-20220615.pdf?li_fat_id=56ba72db-8324-4842-a9b5-2d2382b6fefb)