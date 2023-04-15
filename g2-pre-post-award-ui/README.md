# Searten Pre/Post Award

## Change the IP address of API server
Please change the ip address before you deploy under **/src/apis/request.js**
```
const FLASK_SERVER = "API_SERVER_IP_ADDRESS:5000";
```

## Project Structure

```bash
.
├── Dockerfile
├── package.json
├── README.md
└── src
    ├── apis
    │   ├── http.js     // APIs
    │   └── request.js  // Request utils
    ├── assets          // Statics
    ├── components      // Resuable Components
    ├── pages           // Pages (according to module name)
    │   ├── Approver
    │   ├── Common
    │   ├── Director
    │   ├── Layout
    │   ├── Login
    │   ├── Project
    │   ├── Status
    │   └── Test
    └── utils           // Utility functions
        └── index.js
```

## Branches

- **master**: Integration branch
- **dev**: Development branch
## Techstack

- Frontend Framework: [react.js](https://reactjs.org/docs/getting-started.html)
- UI Library: [Ant Design](https://ant.design/components/overview/)
- Richtext Editor: [braft-editor](https://github.com/margox/braft-editor)
- Request library: [Axios](https://github.com/axios/axios)
- Mock Server: [json-server](https://github.com/typicode/json-server)

## Run the app

Open your terminal and enter the project directory, run the command

```bash
# You should install Node before running the commands.
# https://nodejs.org/en/download/
npm install
npm run start
```

## Develop locally

```bash
# User json-server to mock http request
# https://github.com/typicode/json-server
npm install -g json-server
npm run jserver
```

## React.js Learning materials

- [React.js Offical Documentation in Chinese](https://react.docschina.org/docs/hello-world.html)
- [React.js Crash Course](https://youtu.be/w7ejDZ8SWv8)
- [React Router](https://react-guide.github.io/react-router-cn/)
