# Real-Time-Server-Side
socket.ioを使用したリアルタイムエンジンです。

#### ローカルでの起動方法
1. インストール
```bash
git clone https://github.com/tomokazukozuma/Real-Time-Server-Side.git
cd trinity-ServerNodeJS
npm install
```
2. 起動

コマンドを実行する前にredisサーバーを6379ポートで立ち上げておく

clusterで起動
```bash
npm run start:cluster
```

1プロセスで起動（テスト用）
```bash
npm run start:server
```

オプション付きで起動する場合

事前にbabel-cliをグローバルにインストール
```bash
npm install -g babel-cli
```

```bash
WsGroup=ws01 babel-node app.js --port 3001
```

#### テストコマンド
```bash
npm run test
```
#### linter
```bash
npm run lint
```

#### テスト用接続クライアント
サーバー側を立ち上げたあと下記コマンドを実行
```bash
npm run start:client

or

babel-node client/app.js --port 3001
```
