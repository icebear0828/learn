---
id: "message-queues"
topic:
  zh: "消息队列"
  en: "Message Queues"
category: "Middleware"
icon: "FaServer"
summary:
  zh: "使用 RabbitMQ 和 Kafka 掌握异步通信与服务解耦"
  en: "Mastering asynchronous communication and decoupling services using RabbitMQ and Kafka."
details: 
  - "微服务解耦 / Decoupling Microservices"
  - "交换机类型 (Direct, Topic, Fanout) / Exchange Types"
  - "死信队列 (DLQ) / Dead Letter Queues (DLQ)"
  - "事件驱动架构 / Event-Driven Architecture"
  - "幂等性与可靠性 / Idempotency & Reliability"
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
