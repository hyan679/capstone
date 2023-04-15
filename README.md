# Instruction

This project comes from my capstone in 2021

## Directory
```bash
.
├── docker-compose.yml		// entry point
├── g2-pre-post-award-api	// Backend Project 
├── g2-pre-post-award-db	// Database Setup
└── g2-pre-post-award-ui	// Frontend Project

```

## How to run?
1. Install docker in your OS 
2. Change the IP address as below:
```bash
# g2-pre-post-award-api/flaskr/db.py
host = "119.91.210.228"	# Change it according to yours

# g2-pre-post-award-ui/src/apis/request.js
const FLASK_SERVER = "http://119.91.210.228:5000";	# Change it according to yours
```
3. Run the project
```bash
docker-compose up
```