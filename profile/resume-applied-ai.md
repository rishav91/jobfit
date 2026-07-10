**RISHAV RAUSHAN**

\+91-8340411359  |  [rraushan.com](http://rraushan.com)  |  [rishav.raushan@gmail.com](mailto:rishav.raushan@gmail.com)  |  [linkedin.com/in/rishavrau](https://www.linkedin.com/in/rishavrau)  |  [github.com/rishav91](https://github.com/rishav91)

Principal Developer and Tech Lead building production Applied AI systems — agentic workflows, RAG, LLM Observability and evals for 2+ years, backed by a decade leading fault-tolerant, high-scale distributed systems across sports-tech, solar-design, and e-tendering. Experienced in leading cross-functional teams, collaborating with international stakeholders, and owning AI initiatives end-to-end from concept to delivery.

**SKILLS**

**Applied AI:** Agentic Workflows, LangGraph, RAG (hybrid retrieval, cross-encoder reranking), Tool Use, Structured Outputs, Eval Harnesses (LLM-as-judge), Vector DBs (ChromaDB, Qdrant, pgvector), AI Observability (LangSmith, OpenTelemetry), Amazon Bedrock

**Languages:** Python, TypeScript, Java

**Backend & Data:** FastAPI, gRPC, NodeJS, Fastify, tRPC, Django, PostgreSQL, DynamoDB, MongoDB, Kafka, Redis

**Architecture:** Microservices, Event-driven design, Pub/Sub, Fault-tolerant Systems, Event Sourcing, CQRS

**Infra & Delivery:** AWS, GCP, GitHub Actions, Docker, Kubernetes, Prometheus, OpenTelemetry

**Frontend:** React, Redux, Zustand, TanStack Query

**APPLIED AI PROJECTS**

**Blitz — NFL Stats Agent**

* Agentic RAG over NFL play-by-play and roster data — a LangGraph router/retrieval/generation/reflection/HITL graph backed by ChromaDB, with a model-agnostic chat layer. Every LLM call is OTel-traced end-to-end.
* **Stack:** Python, LangGraph, ChromaDB, Streamlit, OpenTelemetry, Grafana, Pandas, Numpy.

**FieldOps Copilot**

* AI triage over NYC 311 service requests designed around a daily feed flowing through embedding-based dedup, a calibrated cascade classifier with a confidence gate, and a single LangGraph agent loop on only the ambiguous tail — which drafts human-gated work orders. An LLM-as-judge benchmarks the agent against a baseline with stated CIs.
* **Stack:** Python, FastAPI, Postgres/pgvector, LangGraph, Langsmith, OpenTelemetry

**Grounded RAG over Wikipedia**

* Grounded RAG over 1K Wikipedia articles — hybrid dense+sparse retrieval, cross-encoder reranking, cited generation, and an explicit abstain path when evidence is weak. Every answer is grounded, scored, ACL-aware, and designed to scale toward 10M docs.
* **Stack:** Python, FastAPI, Qdrant, LangGraph, Postgres/pgvector, Cohere Rerank, OpenAI, HuggingFace.

**Dev Intelligence Platform**

* Multi-tenant developer-intelligence platform ingesting GitHub activity to surface PR bottlenecks, review health, CI flakiness, and blockers on an event-driven CQRS stack; ships metrics only on signal-confident data, with GenAI for narration, classical ML for clustering/classification, and deterministic logic for DORA metrics.
* **Stack:** Go, Python, FastAPI, LangGraph, Kafka, Flink, Postgres/Citus, ClickHouse, LightGBM, OpenTelemetry

**PROFESSIONAL EXPERIENCE**

**Principal Developer / Tech Lead**  | PinnacleCode Solutions, Hyderabad (Client: TOCA Football, USA)  |  *Jan 2023 – Apr 2026*

* Led a cross-functional India team of 6 engineers delivering a sports-tech platform spanning player, trainer, kiosk, and admin experiences across 25+ physical studios powering  \~1,200 bookings/day and serving \~6K DAU.  
* Architected a vendor-agnostic AI insights layer over BLE-captured session telemetry, generating LLM-based post-session recaps and analysis-driven pre-session training advisories, with PII-redacted prompts, fail-silent degradation, and idempotent caching to bound cost and latency.
* Engineered a high-integrity payment layer via Stripe managing $4.3M+ in annualized revenue (\~14k transactions/mo); integrated MBO and HubSpot for booking/scheduling and CRM workflows.  
* Re-architected training session communication from a Dedicated Studio PC-based MQTT/BLE gateway to direct BLE on iPad, eliminating a single point of failure while reducing session failures by 18%, delays by 34% and session load time by 60%.  
* Delivered full offline capability for the trainer app with schedule caching, async post-session upload, and on-device authentication, enabling reliable operation in near-zero-connectivity environments.  
* Built a shared Google Cloud Pub/Sub backplane across player and admin experiences delivering real-time booking updates with \~550 peak concurrent WebSocket connections.  
* Replaced FullStory with a lightweight custom observability service, eliminating approximately $6k/month in analytics spend while retaining product observability.

**Associate Manager / Senior Software Developer**  |  UNIRAC, Hyderabad  |  *Nov 2019 – Dec 2022*

* Led technical delivery for UBuilder, a customer-facing solar design, estimation, and proposal platform used by 500+ customers
* Automated project design/import/export, BOM generation, cost estimation, proposal and engineering review workflows, reducing design-to-proposal cycle time by ~8 days.  
* Standardized engineering rules, product constraints, and pricing logic across 15+ racking/configuration scenarios, improving quote consistency and reducing manual engineering review for standard projects.  
* Partnered with US product, sales, and engineering stakeholders to translate solar racking requirements into scalable customer workflows supporting \~90 project designs/proposals per month.  
* Scaled the India engineering team from 3 to 10 developers while establishing onboarding, code review, delivery planning, and technical ownership practices.

**Senior Software Developer**  |  BrightWhite Innovations, Kolkata  |  *Jan 2018 – Nov 2019*

* Engineered a secure, auditable repository for competitive bidding on a B2B e-tendering portal (React Native, Django) 
* Implemented state-machine logic to manage complex multi-round RFP lifecycles, vendor clarifications, and immutable audit trails for private-sector procurement.
* Managed user authentication and data storage via Firebase.

**Software Developer**  |  Amdocs, Pune  |  *Aug 2015 – Dec 2017*

* Built responsive React front-end interfaces and Java REST APIs for an e-commerce product selling IT goods and services.
* Architected an async ingestion pipeline to sync complex telecom bundling rules, promotional constraints and regional tax logic from CRM into a relational DB and expose them for e-commerce checkout flows.

**Software Engineer Intern**  |  NestAway, Bangalore  |  *Jan 2015 – June 2015*

* Developed a lightweight Settlement Reconciliation service that used background workers to scan daily bank settlements against our internal financial ledgers, flagging payment mismatches or double-charges.
* Built Ruby on Rails services to generate tenant agreements and advance-payment/furnishing receipts, including parsing ODK form submissions and email them to the relevant client.


**EDUCATION**

**Indian Institute of Information Technology, Allahabad**  |  **B.Tech., IT**  |  *2011 – 2015*
