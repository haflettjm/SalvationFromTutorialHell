# 26-50: Applied Engineering

Projects that combine multiple concepts, introduce real-world patterns, and start touching production-grade concerns.

| # | Project | Description | Status |
|---|---------|-------------|--------|
| 26 | API Gateway | Route requests to multiple backend services with rate limiting and auth middleware | Not Started |
| 27 | Job Queue Worker | Producer-consumer system with background job processing **(Redis)** | Not Started |
| 28 | WebSocket Chat App | Real-time chat with rooms, user presence, and message history **(MongoDB)** | Not Started |
| 29 | Reverse Proxy | Forward traffic to backend servers with load balancing and health checks | Not Started |
| 30 | gRPC Microservice | Two services communicating over gRPC with protobuf schemas | Not Started |
| 31 | OAuth2 Provider | Full OAuth2 flow — authorization server, token issuance, resource protection **(PostgreSQL)** | Not Started |
| 32 | Event-Driven Pipeline | Publish/subscribe system using message queues (NATS or RabbitMQ) | Not Started |
| 33 | CI/CD Pipeline Builder | Tool that generates GitHub Actions workflows from config files | Not Started |
| 34 | Redis Cache Layer | Add caching in front of a slow API, handle invalidation and TTLs **(Redis)** | Not Started |
| 35 | Webhook Relay Service | Receive, queue, retry, and forward webhooks to registered endpoints | Not Started |
| 36 | Terraform Module | IaC module that provisions cloud infrastructure (VPC, EC2/containers, networking) | Not Started |
| 37 | Service Health Dashboard | Aggregate health checks from multiple services into a single dashboard with alerts | Not Started |
| 38 | Database Migration Tool | Version-controlled schema migrations with up/down support **(PostgreSQL)** | Not Started |
| 39 | Secrets Manager | Store, rotate, and inject secrets into applications securely | Not Started |
| 40 | Container Orchestrator (mini) | Schedule and manage containers across multiple hosts (simplified K8s concepts) | Not Started |
| 41 | Log Aggregation Service | Collect logs from multiple services, index, and make searchable | Not Started |
| 42 | Rate Limiter Service | Distributed rate limiting using token bucket or sliding window **(Redis)** | Not Started |
| 43 | Feature Flag System | Toggle features on/off per user/environment without redeploying | Not Started |
| 44 | ETL Data Pipeline | Extract data from APIs, transform it, load into a database **(PostgreSQL)** | Not Started |
| 45 | Notification Service | Multi-channel notifications (email, SMS, push) with templates and queuing | Not Started |
| 46 | RBAC Authorization Service | Role-based access control with permissions, roles, and policies **(PostgreSQL)** | Not Started |
| 47 | Distributed Config Store | Centralized configuration for multiple services with hot-reload | Not Started |
| 48 | Canary Deployment Tool | Roll out changes to a percentage of traffic, monitor, and auto-rollback | Not Started |
| 49 | API Versioning Service | Serve multiple API versions simultaneously with deprecation handling | Not Started |
| 50 | Integration Test Framework | Build a test harness that spins up services in Docker and runs e2e tests | Not Started |

---

### Skills introduced in this tier:
- Message queues & event-driven architecture (NATS, RabbitMQ)
- Caching patterns (Redis)
- gRPC & protobuf
- Infrastructure as Code (Terraform)
- OAuth2 & RBAC
- Distributed systems patterns
- ETL & data pipelines
- CI/CD pipeline design
- Integration & e2e testing
