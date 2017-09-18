# Client
Real-Time-Server-Sideのテスト用クライアントソースコードです。

#### 実行方法
サーバー側を立ち上げたあと下記コマンドを実行
```bash
npm run start:client

or
# port:3001に接続し、roomId:1にjoinする
babel-node client/app.js --port 3001 --room 1
```
