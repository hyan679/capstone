## Project directory
```bash
.
├── Dockerfile
├── flaskr
│   ├── agreement.py    // Agreement module API
│   ├── application.py  // Application module API
│   ├── db.py           // DB connection
│   ├── __init__.py  
│   ├── project.py      // Project module API
│   └── user.py         // User module API
├── requirements.txt    // Packages
└── run.py
```

## DB Information
When you are deploying the application, make sure you change the database IP ADDRESS in **flaskr/db.py**
```
host = "YOUR_IP_ADDRESS"
port = 3306
user = "root"
password = "SeartenMarketplaceftw2021"
database = "masterdb"
```