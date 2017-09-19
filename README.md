# Real-Time-Server-Side
It is a real-time engine using socket.io.

#### How to setup
1. Install
```bash
git clone https://github.com/tomokazukozuma/Real-Time-Server-Side.git
cd Real-Time-Server-Side
npm install
```
2. Start Up

Before executing the command, start the redis server with 6379 port.

Start up with cluster
```bash
npm run start:cluster
```

Start up in one process
```bash
npm run start:server
```

When starting with option

Install babel-cli globally in advance.
```bash
npm install -g babel-cli
```

```bash
WsGroup=ws01 babel-node app.js --port 3001
```

#### Run Test
```bash
npm run test
```
#### linter
```bash
npm run lint
```

#### Client for Testing
After launching the server side, execute the following command.
```bash
npm run start:client

or

babel-node client/app.js --port 3001
```
