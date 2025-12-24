const quizQuestionsData = [
    // Chapter 1: CAP Theorem & Consistency Questions (1-6)
    {
        "id": 1,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "SCENARIO: A network cable is cut between your US and EU data centers. A user in the US tries to transfer money. According to CAP, what must you sacrifice?",
        "options": [
            "Partition Tolerance",
            "Consistency",
            "Availability",
            "Speed"
        ],
        "correctIndex": 2,
        "feedback": "Network failures happen and you cannot stop them. Because you cannot risk money disappearing or being doubled (Consistency), you must choose to show an error message. This means you are sacrificing Availability (uptime) to keep the data safe."
    },
    {
        "id": 2,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "SCENARIO: You are building a 'Likes' counter for a viral video. It's okay if the count is off by a few likes for a few seconds. What CAP trade-off do you choose?",
        "options": [
            "Prioritize Consistency (Error out if sync fails)",
            "Prioritize Availability (Always accept the like)",
            "Prioritize Consistency and Availability",
            "ACID transactions"
        ],
        "correctIndex": 1,
        "feedback": "For a like counter, it is better to keep the site working so users can click 'Like' (Availability). It is acceptable if the total number is slightly wrong for a few seconds before it catches up."
    },
    {
        "id": 3,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "TRICKY: A system claims to be 'CA' (Consistent and Available) but NOT Partition Tolerant. When would this actually work in practice?",
        "options": [
            "In any cloud deployment",
            "Only when all nodes are on the same physical machine or network failures are impossible",
            "When using NoSQL databases",
            "When using async replication"
        ],
        "correctIndex": 1,
        "feedback": "In the real world, network partitions ALWAYS happen in distributed systems. A true 'CA' system only works on a single node or in an environment where network failures are physically impossible (which is impractical for distributed systems)."
    },
    {
        "id": 4,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "SCENARIO: What is 'Eventual Consistency'?",
        "options": [
            "Data is never consistent.",
            "Data is instantly consistent everywhere.",
            "Data will become consistent after a short delay (e.g., seconds).",
            "Data is only consistent on Sundays."
        ],
        "correctIndex": 2,
        "feedback": "This means that if you stop updating the data, all the servers will eventually sync up and have the same information. It might take a few seconds, but it will happen."
    },
    {
        "id": 5,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "TRICKY: According to PACELC theorem, what happens in your system during NORMAL operations (no partition)?",
        "options": [
            "You only need to worry about Consistency",
            "You must still choose between Latency and Consistency",
            "The system becomes fully ACID compliant",
            "Availability becomes irrelevant"
        ],
        "correctIndex": 1,
        "feedback": "PACELC extends CAP by stating that even without partitions (normal operation), you must still trade-off between Latency and Consistency. Lower latency often means relaxed consistency."
    },
    {
        "id": 6,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "SCENARIO: Your banking application uses a CP database that prioritizes consistency. During a network partition, users cannot access their account balance. Is this expected behavior?",
        "options": [
            "No, this is a critical bug",
            "Yes, CP systems sacrifice availability during partitions",
            "No, CP systems should still show cached data",
            "Yes, but only for write operations"
        ],
        "correctIndex": 1,
        "feedback": "CP databases prioritize Consistency over Availability. During a network partition, they will refuse to serve potentially stale data, resulting in errors or unavailability until the partition is resolved."
    },
    // Chapter 1: Scaling & Stateless Questions (7-12)
    {
        "id": 7,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "SCENARIO: Your server is crashing because it has too many users. You add a second server, but users get logged out when the Load Balancer switches them. Why?",
        "options": [
            "The database is full.",
            "Sessions are stored in the server's local memory/files (Stateful).",
            "The internet is slow.",
            "The Load Balancer is broken."
        ],
        "correctIndex": 1,
        "feedback": "The user's login session was saved on the hard drive of the first server. When the Load Balancer sent them to the second server, that server didn't know who they were."
    },
    {
        "id": 8,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "SCENARIO: How do you fix the issue where users get logged out when switching servers?",
        "options": [
            "Use 'Sticky Sessions' forever.",
            "Store sessions in a shared Redis cluster.",
            "Tell users to not refresh.",
            "Buy a bigger server."
        ],
        "correctIndex": 1,
        "feedback": "Instead of saving the session on the web server, you save it in a central Redis database. Now, any web server can check Redis to see if the user is logged in."
    },
    {
        "id": 9,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "SCENARIO: What is 'Vertical Scaling'?",
        "options": [
            "Adding more servers (e.g., 1 -> 10 servers).",
            "Making the single server bigger (e.g., 8GB RAM -> 64GB RAM).",
            "Stacking servers on top of each other.",
            "Optimizing code."
        ],
        "correctIndex": 1,
        "feedback": "Vertical scaling means upgrading the hardware of your existing machine (more RAM, better CPU). It is easy to do, but eventually, you hit a limit."
    },
    {
        "id": 10,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "TRICKY: Your company decides to vertically scale instead of horizontally scale. What is the MAIN risk they are taking?",
        "options": [
            "The server will run slower",
            "They create a Single Point of Failure and hit hardware limits",
            "The database will corrupt",
            "Load balancing becomes impossible"
        ],
        "correctIndex": 1,
        "feedback": "Vertical scaling has limits (you can't add infinite RAM to one machine), and if that single powerful server fails, your entire system goes down. Horizontal scaling distributes risk."
    },
    {
        "id": 11,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "SCENARIO: What is 'Horizontal Scaling'?",
        "options": [
            "Adding more servers (e.g., 1 -> 10 servers).",
            "Making the single server bigger.",
            "Deleting data.",
            "Turning the monitor sideways."
        ],
        "correctIndex": 0,
        "feedback": "Horizontal scaling means adding more machines to your fleet. This is how huge companies like Google scale, because there is no limit to how many servers you can add."
    },
    {
        "id": 12,
        "chapter": "chapter1",
        "chapterName": "Chapter I: Networking Fundamentals",
        "text": "TRICKY: A Load Balancer using 'Round Robin' algorithm sends user A's login request to Server 1, then their profile request to Server 2. The profile request fails. What architecture pattern is being violated?",
        "options": [
            "ACID compliance",
            "Stateless architecture",
            "Database normalization",
            "Microservices pattern"
        ],
        "correctIndex": 1,
        "feedback": "If Session state is stored locally on servers, round-robin will break the user experience. The system should be stateless (centralized session store) or use sticky sessions."
    },
    // Chapter 2: Database Questions (13-20)
    {
        "id": 13,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "SCENARIO: Your SQL database is too slow because of too many READ requests (SELECTs). What is the standard fix?",
        "options": [
            "Sharding",
            "Read Replicas (Master-Slave)",
            "Switch to NoSQL",
            "Delete old data"
        ],
        "correctIndex": 1,
        "feedback": "You can create copies of your database called 'Read Replicas'. You send all the heavy 'read' traffic to these copies, leaving the main database free to handle new data."
    },
    {
        "id": 14,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "SCENARIO: Your SQL database is too slow because of too many WRITE requests (INSERTs). Replicas won't help. What now?",
        "options": [
            "Add more Read Replicas.",
            "Sharding (Partitioning)",
            "Add an Index.",
            "Compress the data."
        ],
        "correctIndex": 1,
        "feedback": "If one database cannot handle the speed of incoming data, you must split the data across multiple different servers. This is called Sharding."
    },
    {
        "id": 15,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "SCENARIO: You shard your User DB by 'Country'. One shard (USA) is huge, while 'Fiji' is empty. What is this problem called?",
        "options": [
            "Data Corruption",
            "Data Skew (Hot Partition)",
            "Deadlock",
            "Race Condition"
        ],
        "correctIndex": 1,
        "feedback": "This is called Data Skew. It happens when you pick a bad way to split your data, causing one server to work much harder than the others."
    },
    {
        "id": 16,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "SCENARIO: Why is 'Consistent Hashing' used in Sharding?",
        "options": [
            "To encrypt passwords.",
            "To add/remove servers without moving ALL the data.",
            "To compress data.",
            "To make hash maps faster."
        ],
        "correctIndex": 1,
        "feedback": "Consistent Hashing is a smart way to distribute data so that if you add a new server, you only have to move a tiny amount of data, not everything."
    },
    {
        "id": 17,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "TRICKY: In a Master-Master (Multi-Master) replication setup, two users simultaneously update the same row on different masters. What problem will occur?",
        "options": [
            "Data compression",
            "Write Conflict requiring resolution",
            "Automatic failover",
            "Indexing issues"
        ],
        "correctIndex": 1,
        "feedback": "Multi-Master replication can cause write conflicts when the same data is modified on different nodes. You need conflict resolution strategies like 'last write wins' or application-level merging."
    },
    {
        "id": 18,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "SCENARIO: You need a database for a social network where relationships (friends of friends) are the primary query pattern. Which database type is best?",
        "options": [
            "Relational (SQL)",
            "Document (MongoDB)",
            "Graph (Neo4j)",
            "Key-Value (Redis)"
        ],
        "correctIndex": 2,
        "feedback": "Graph databases excel at traversing relationships. Queries like 'friends of friends' or 'shortest path between users' are native operations, while they'd require expensive JOINs in SQL."
    },
    {
        "id": 19,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "TRICKY: A developer adds an index on EVERY column 'just to be safe'. What negative consequence will occur?",
        "options": [
            "Reads become slower",
            "Writes become slower and storage increases",
            "The database crashes",
            "Queries return wrong results"
        ],
        "correctIndex": 1,
        "feedback": "Every index speeds up reads but slows down writes because the index must be updated. Too many indexes also consume significant storage. Index only what you query frequently."
    },
    {
        "id": 20,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "SCENARIO: What does ACID stand for in database transactions?",
        "options": [
            "Aggregate, Calculate, Insert, Delete",
            "Atomicity, Consistency, Isolation, Durability",
            "Asynchronous, Cached, Indexed, Distributed",
            "Advanced, Complex, Integrated, Dynamic"
        ],
        "correctIndex": 1,
        "feedback": "ACID ensures reliable transactions: Atomicity (all-or-nothing), Consistency (valid states only), Isolation (concurrent transactions don't interfere), Durability (committed data survives failures)."
    },
    // Chapter 2: Caching Questions (21-26)
    {
        "id": 21,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "SCENARIO: You use 'Cache-Aside'. You read from Cache, it's empty (Miss). What happens next?",
        "options": [
            "Return error.",
            "Read from DB, then write to Cache, then return.",
            "Wait for cache to fill.",
            "Read from DB and ignore Cache."
        ],
        "correctIndex": 1,
        "feedback": "The standard pattern is: 1. Check Cache (Miss). 2. Get data from Database. 3. Save that data to Cache. 4. Return data to user."
    },
    {
        "id": 22,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "SCENARIO: What is the 'Thundering Herd' problem?",
        "options": [
            "Too many cows.",
            "Cache expires, and thousands of requests hit the DB at the exact same instant.",
            "The network is slow.",
            "Disk is full."
        ],
        "correctIndex": 1,
        "feedback": "This happens when a popular item (like the homepage news) disappears from the cache. Suddenly, thousands of users all hit the database at once to get it, often crashing the database."
    },
    {
        "id": 23,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "SCENARIO: Which cache eviction policy deletes the data that hasn't been used for the longest time?",
        "options": [
            "FIFO (First In First Out)",
            "LIFO (Last In First Out)",
            "LRU (Least Recently Used)",
            "Random"
        ],
        "correctIndex": 2,
        "feedback": "LRU (Least Recently Used) is the best standard. It keeps the popular data in memory and deletes the old data that nobody is looking at anymore."
    },
    {
        "id": 24,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "TRICKY: You're using a Write-Through cache. A write operation completes successfully. Can you be 100% sure the data is persisted in both cache AND database?",
        "options": [
            "No, only the cache is guaranteed",
            "Yes, Write-Through writes to both synchronously",
            "No, database write happens asynchronously",
            "Only if you enable transactions"
        ],
        "correctIndex": 1,
        "feedback": "Write-Through cache writes to both the cache AND the database simultaneously before returning success. This guarantees consistency but adds latency to writes."
    },
    {
        "id": 25,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "SCENARIO: Your cache has 'Write-Back' (Write-Behind) strategy. The cache server crashes before syncing to DB. What happens to the recent writes?",
        "options": [
            "They are automatically recovered",
            "They are lost permanently",
            "They are stored in another cache",
            "The database has a backup"
        ],
        "correctIndex": 1,
        "feedback": "Write-Back is risky because data sits in cache before being written to DB. If the cache crashes before the async sync, that data is lost. Use replication to mitigate this."
    },
    {
        "id": 26,
        "chapter": "chapter2",
        "chapterName": "Chapter II: Databases & Data Management",
        "text": "TRICKY: A CDN is serving stale content even after you updated the origin server. What is the most likely cause?",
        "options": [
            "The CDN is broken",
            "The content's TTL (Time-To-Live) hasn't expired yet",
            "The origin server is down",
            "Too many users"
        ],
        "correctIndex": 1,
        "feedback": "CDNs cache content based on TTL. Until the TTL expires, the CDN serves cached content. You can either wait, use cache invalidation, or add versioning to URLs."
    },
    // Chapter 3: Message Queues & Async (27-32)
    {
        "id": 27,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "SCENARIO: Why put a Message Queue (SQS/RabbitMQ) between a Web Server and an Image Processing Worker?",
        "options": [
            "To make processing faster.",
            "To decouple them so the Web Server doesn't wait (Async).",
            "To save disk space.",
            "To encrypt the image."
        ],
        "correctIndex": 1,
        "feedback": "Processing an image takes time. Using a queue allows the web server to say 'Received!' instantly, while a background worker processes the image later."
    },
    {
        "id": 28,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "SCENARIO: What is a 'Dead Letter Queue' (DLQ)?",
        "options": [
            "A queue for emails.",
            "A queue where failed messages go after max retries.",
            "A slow queue.",
            "A deleted queue."
        ],
        "correctIndex": 1,
        "feedback": "If a job fails 5 times in a row, you don't want it to block the system forever. You move it to a special 'Dead Letter Queue' so a developer can inspect it later."
    },
    {
        "id": 29,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "SCENARIO: You have a 'Fan-out' architecture. What does that mean?",
        "options": [
            "One message is sent to multiple different queues/subscribers.",
            "Cooling the servers.",
            "Deleting old messages.",
            "Merging queues."
        ],
        "correctIndex": 0,
        "feedback": "Fan-out means you send one message (like 'New Video Uploaded') and it is broadcast to many different services (Notifications, Analytics, etc.) at the same time."
    },
    {
        "id": 30,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "TRICKY: In a Publish-Subscribe system, what happens if a subscriber was offline when a message was published and there's no message persistence?",
        "options": [
            "The message is delivered when they come back online",
            "The message is lost and the subscriber never receives it",
            "The publisher retries automatically",
            "Another subscriber receives it instead"
        ],
        "correctIndex": 1,
        "feedback": "Basic pub/sub is fire-and-forget. If a subscriber is offline and the system doesn't persist messages, they miss them. This is why systems like Kafka persist messages."
    },
    {
        "id": 31,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "SCENARIO: Your message queue is filling up faster than consumers can process. What is this called and how do you handle it?",
        "options": [
            "Deadlock - restart the queue",
            "Backpressure - add more consumers or rate limit producers",
            "Starvation - add more producers",
            "Race condition - use locks"
        ],
        "correctIndex": 1,
        "feedback": "Backpressure occurs when the queue grows faster than it's drained. Solutions include scaling consumers, rate-limiting producers, or implementing back-off strategies."
    },
    {
        "id": 32,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "TRICKY: A payment system uses a message queue. The consumer crashes after processing a payment but BEFORE acknowledging the message. What happens when it restarts?",
        "options": [
            "The payment is lost",
            "The payment may be processed twice (duplicate)",
            "The queue automatically detects this",
            "The producer is notified"
        ],
        "correctIndex": 1,
        "feedback": "If acknowledgment happens after processing, a crash before ACK means the message is redelivered. This can cause duplicates. You need idempotent consumers to handle this safely."
    },
    // Chapter 3: API Design Questions (33-38)
    {
        "id": 33,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "SCENARIO: REST vs. GraphQL. What is a major advantage of GraphQL?",
        "options": [
            "It is older and more stable.",
            "It prevents 'Over-fetching' (Clients ask for exactly what they need).",
            "It doesn't use HTTP.",
            "It is always faster."
        ],
        "correctIndex": 1,
        "feedback": "REST APIs often send back too much data. GraphQL allows the frontend to say 'I only want the user's name', saving bandwidth."
    },
    {
        "id": 34,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "SCENARIO: What is 'Long Polling'?",
        "options": [
            "The client asks repeatedly every second.",
            "The client opens a connection, and the server holds it open until data is ready.",
            "Using a very long cable.",
            "Sending a large file."
        ],
        "correctIndex": 1,
        "feedback": "In Long Polling, the client asks for data, and the server keeps the connection open and waits until there is new data before responding. It is more efficient than asking every second."
    },
    {
        "id": 35,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "SCENARIO: Protocol Buffers (gRPC) vs JSON. Why use gRPC internally between microservices?",
        "options": [
            "It is human readable.",
            "It is binary, smaller, and faster to parse.",
            "It works better in browsers.",
            "It is easier to debug."
        ],
        "correctIndex": 1,
        "feedback": "JSON is text, which is slow for computers to read. gRPC is binary (like compiled code), which makes it much faster for servers to talk to each other."
    },
    {
        "id": 36,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "TRICKY: Your REST API returns nested resources (user -> posts -> comments). Mobile clients complain about slow performance. What's the likely issue?",
        "options": [
            "Server is too slow",
            "N+1 query problem and over-fetching",
            "Database needs more indexes",
            "Too many users"
        ],
        "correctIndex": 1,
        "feedback": "Nested REST resources can cause N+1 queries (one for user, N for posts, N*M for comments) and send too much data. GraphQL or BFF pattern can help mobile clients."
    },
    {
        "id": 37,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "SCENARIO: WebSockets vs Server-Sent Events (SSE). When would you choose SSE over WebSockets?",
        "options": [
            "When you need two-way real-time communication",
            "When server only needs to push updates to client (one-way)",
            "When you need binary data transfer",
            "When low latency is critical"
        ],
        "correctIndex": 1,
        "feedback": "SSE is simpler and works over HTTP for server-to-client streaming (like news feeds). WebSockets are needed when the client also needs to send frequent messages back."
    },
    {
        "id": 38,
        "chapter": "chapter3",
        "chapterName": "Chapter III: System Architecture Patterns",
        "text": "TRICKY: An API Gateway sits in front of your microservices. The gateway goes down. What happens to ALL your services?",
        "options": [
            "They continue working normally",
            "They become inaccessible to external clients (Single Point of Failure)",
            "They auto-scale to handle traffic",
            "Internal communication still works"
        ],
        "correctIndex": 1,
        "feedback": "The API Gateway is a SPOF. If it fails, no external traffic reaches your services. You MUST deploy multiple gateway instances behind a load balancer."
    },
    // Chapter 4: System Reliability & Security (39-44)
    {
        "id": 39,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "SCENARIO: What is a 'Single Point of Failure' (SPOF)?",
        "options": [
            "A bug in the code.",
            "One component (e.g., one Load Balancer) that, if it breaks, kills the whole system.",
            "A failed login.",
            "A slow database."
        ],
        "correctIndex": 1,
        "feedback": "This is a part of your system that has no backup. If it breaks, everything stops working. Good design always adds backups (redundancy)."
    },
    {
        "id": 40,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "SCENARIO: What is 'Rate Limiting' primarily for?",
        "options": [
            "Making the site faster.",
            "Preventing abuse/DDoS by limiting requests per user.",
            "Saving money.",
            "Counting users."
        ],
        "correctIndex": 1,
        "feedback": "Rate Limiting stops a single user or bot from spamming your API with too many requests, which could crash your server."
    },
    {
        "id": 41,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "SCENARIO: What is a 'Circuit Breaker' pattern used for?",
        "options": [
            "Electrical safety",
            "Stop calling a failing service to let it recover",
            "Breaking database connections",
            "Load balancing"
        ],
        "correctIndex": 1,
        "feedback": "When a downstream service fails repeatedly, the circuit breaker 'opens' and immediately returns errors instead of waiting, preventing cascade failures and allowing recovery."
    },
    {
        "id": 42,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "TRICKY: Your system has 99.9% availability SLA. How much downtime per YEAR is allowed?",
        "options": [
            "About 9 hours",
            "About 1 hour",
            "About 5 minutes",
            "About 52 minutes"
        ],
        "correctIndex": 0,
        "feedback": "99.9% (three nines) allows about 8.77 hours of downtime per year (43.8 min/month, 10.1 min/week). 99.99% (four nines) drops to about 52 minutes/year."
    },
    {
        "id": 43,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "SCENARIO: You deploy a new version to 10% of users first to check for bugs. What is this called?",
        "options": [
            "Blue-Green Deployment",
            "Canary Deployment",
            "Red-Black Deployment",
            "Rolling Restart"
        ],
        "correctIndex": 1,
        "feedback": "This is called a Canary deployment. Just like a canary in a coal mine, if the 10% of users have problems, you stop the release before everyone is affected."
    },
    {
        "id": 44,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "TRICKY: Blue-Green deployment keeps TWO full production environments. What's the main DISADVANTAGE?",
        "options": [
            "Slow rollback",
            "Double the infrastructure cost",
            "No testing possible",
            "Complex load balancing"
        ],
        "correctIndex": 1,
        "feedback": "Blue-Green requires maintaining two identical production environments, essentially doubling infrastructure costs. The benefit is instant rollback by switching traffic."
    },
    // Chapter 4: Advanced Data Structures & Algorithms (45-50)
    {
        "id": 45,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "SCENARIO: Bloom Filter. What is it used for?",
        "options": [
            "Making images blurry.",
            "Quickly checking if an item definitely DOES NOT exist.",
            "Sorting a list.",
            "Compressing files."
        ],
        "correctIndex": 1,
        "feedback": "A Bloom Filter is a very fast, memory-efficient way to ask 'Do I have this item?'. It can say 'definitely no' or 'maybe yes', saving you from checking a slow database."
    },
    {
        "id": 46,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "SCENARIO: Geo-Hashing / QuadTree. What is this used for?",
        "options": [
            "Hashing passwords.",
            "Finding 'Nearby' locations (e.g., Uber/Yelp).",
            "Encrypting maps.",
            "Drawing squares."
        ],
        "correctIndex": 1,
        "feedback": "These algorithms break the world map into smaller grids. This allows the computer to quickly search only the grids near you, instead of searching the whole world."
    },
    {
        "id": 47,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "SCENARIO: Why not use a standard UUID (v4) as a Primary Key in MySQL?",
        "options": [
            "It is too short.",
            "It is random, causing 'Page Splitting' and slow inserts.",
            "It is not unique.",
            "MySQL doesn't support strings."
        ],
        "correctIndex": 1,
        "feedback": "Random UUIDs are bad for databases because they are not in order. This makes the database work much harder to organize the data. Sequential IDs (like ULID/Snowflake) are much faster."
    },
    {
        "id": 48,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "TRICKY: A two-phase commit (2PC) is used for distributed transactions. What happens if the COORDINATOR crashes after sending 'prepare' but before sending 'commit'?",
        "options": [
            "All participants auto-commit",
            "All participants auto-rollback",
            "Participants are BLOCKED waiting indefinitely for the coordinator",
            "The transaction succeeds anyway"
        ],
        "correctIndex": 2,
        "feedback": "This is a major weakness of 2PC. If the coordinator crashes between phases, participants holding locks are blocked, waiting for a decision that may never come."
    },
    {
        "id": 49,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "SCENARIO: You need to store 5 years of click-stream logs (Write heavy, Read rarely). What storage is best?",
        "options": [
            "Redis",
            "MySQL",
            "Columnar Database (Cassandra/HBase) or Data Lake",
            "Local File"
        ],
        "correctIndex": 2,
        "feedback": "Columnar databases are designed specially to write data incredibly fast and compress it well, which is perfect for storing huge amounts of logs."
    },
    {
        "id": 50,
        "chapter": "chapter4",
        "chapterName": "Chapter IV: Advanced System Design Topics",
        "text": "TRICKY: Your microservices use the Saga pattern for distributed transactions. The 4th step fails. How are the previous 3 steps handled?",
        "options": [
            "They are automatically rolled back",
            "Compensating transactions are executed for each previous step",
            "The database restores from backup",
            "A coordinator rolls back all changes"
        ],
        "correctIndex": 1,
        "feedback": "Sagas don't use traditional rollback. Instead, each step has a 'compensating transaction' that undoes its work. If step 4 fails, compensating actions for steps 3, 2, 1 run in reverse order."
    }
];

// Chapter definitions for filtering
const quizChapters = [
    { id: "all", name: "All Chapters", shortName: "All Chapters", icon: "📚", description: "All 50 questions from every chapter" },
    { id: "chapter1", name: "Chapter I: Networking Fundamentals", shortName: "Networking", icon: "🌐", description: "CAP theorem, scaling, load balancing" },
    { id: "chapter2", name: "Chapter II: Databases & Data Management", shortName: "Databases", icon: "🗄️", description: "SQL, NoSQL, ACID, caching, sharding" },
    { id: "chapter3", name: "Chapter III: System Architecture Patterns", shortName: "Architecture", icon: "🏗️", description: "Queues, Pub/Sub, APIs, microservices" },
    { id: "chapter4", name: "Chapter IV: Advanced Topics", shortName: "Advanced", icon: "⚙️", description: "Rate limiting, security, algorithms" }
];

// Helper function to get questions by chapter
function getQuestionsByChapter(chapterId) {
    if (chapterId === "all") {
        return quizQuestionsData;
    }
    return quizQuestionsData.filter(q => q.chapter === chapterId);
}