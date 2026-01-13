---
id: "message-queues"
topic: "Message Queues"
category: "Middleware"
icon: "FaServer"
summary: "Mastering asynchronous communication and decoupling services using RabbitMQ and Kafka."
details: 
  - "Decoupling Microservices"
  - "Exchange Types (Direct, Topic, Fanout)"
  - "Dead Letter Queues (DLQ)"
  - "Event-Driven Architecture"
  - "Idempotency & Reliability"
link: "/notes/backend/mq-deep-dive"
date: "2025-12-30"
---

# Message Queues (MQ) Learning Notes

## Core Concepts

### Why MQ?
- **Decoupling**: Producers and consumers don't need to know about each other.
- **Buffering**: Handle traffic spikes without crashing consumers.
- **Asynchronicity**: Improve response times by offloading heavy tasks.

### Key Technologies
- **RabbitMQ**: Great for complex routing and task queues.
- **Kafka**: High-throughput event streaming.

### Patterns Learned
1. **Work Queues**: Distributing time-consuming tasks among multiple workers.
2. **Pub/Sub**: Sending messages to many consumers at once.
3. **Routing**: Receiving only selected messages.
