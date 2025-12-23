const quizQuestionsData = [
    {
        "id": 1,
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
        "text": "SCENARIO: You choose a system that prioritizes Safety/Consistency. The network fails. What does the user see?",
        "options": [
            "The old data",
            "A 'System Error' or timeout",
            "A successful save",
            "A loading spinner forever"
        ],
        "correctIndex": 1,
        "feedback": "If the system cannot guarantee the data is safe on all servers, it will refuse to process the request. The user sees an error message to prevent data corruption."
    },
    {
        "id": 4,
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
        "id": 6,
        "text": "SCENARIO: How do you fix the issue in Question 5 (make it 'Stateless')?",
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
        "id": 7,
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
        "id": 8,
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
        "id": 9,
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
        "id": 10,
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
        "id": 11,
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
        "id": 12,
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
        "id": 13,
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
        "id": 14,
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
        "id": 15,
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
        "id": 16,
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
        "id": 17,
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
        "id": 18,
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
        "id": 19,
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
        "id": 20,
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
        "id": 21,
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
        "id": 22,
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
        "id": 23,
        "text": "SCENARIO: How do you prevent a 'Man-in-the-Middle' attack?",
        "options": [
            "Use a VPN.",
            "Use HTTPS (TLS/SSL).",
            "Hide the server IP.",
            "Use stronger passwords."
        ],
        "correctIndex": 1,
        "feedback": "HTTPS encrypts the data moving between the user and the server. Even if a hacker intercepts the data, they cannot read it."
    },
    {
        "id": 24,
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
        "id": 25,
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
        "id": 26,
        "text": "SCENARIO: You need to store 5 years of click-stream logs (Write heavy, Read rarely).",
        "options": [
            "Redis",
            "MySQL",
            "Columnar Database (Cassandra/HBase) or Data Lake.",
            "Local File"
        ],
        "correctIndex": 2,
        "feedback": "Columnar databases are designed specially to write data incredibly fast and compress it well, which is perfect for storing huge amounts of logs."
    },
    {
        "id": 27,
        "text": "SCENARIO: What is the difference between Logging and Metrics?",
        "options": [
            "No difference.",
            "Logging is text (events); Metrics are numbers (trends).",
            "Logging is for users; Metrics are for servers.",
            "Metrics are slower."
        ],
        "correctIndex": 1,
        "feedback": "Logs tell you a specific story (e.g., 'User failed to login'). Metrics give you a number overview (e.g., 'Total logins today: 500')."
    },
    {
        "id": 28,
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
        "id": 29,
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
        "id": 30,
        "text": "SCENARIO: Geo-Hashing / QuadTree. What is this used for?",
        "options": [
            "Hashing passwords.",
            "Finding 'Nearby' locations (e.g., Uber/Yelp).",
            "Encrypting maps.",
            "Drawing squares."
        ],
        "correctIndex": 1,
        "feedback": "These algorithms break the world map into smaller grids. This allows the computer to quickly search only the grids near you, instead of searching the whole world."
    }
];