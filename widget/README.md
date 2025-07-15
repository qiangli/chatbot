# AI Chatbot

AI Chatbot is a lightweight AI chat web app built with vite+react to work with [AI Command Line Tool](https://github.com/qiangli/ai) hub services.

![UI image](./docs/chatbot-ui.png)

## Install and Run

```bash
# pnpm install
just install

# pnpm build
just build

# go run server/main.go
just start
```

## AI Hub Service

Check out and build [AI Command Line Tool](https://github.com/qiangli/ai)

```bash
# ai --hub --hub-address ":58080" --hub-pg-address ":5432" --hub-mysql-address ":3306" --hub-redis-address ":6379" --agent ask --verbose

just hub
```

## Chatbot UI

Visit UI Client [http://localhost:18083](http://localhost:18083)

## Miscellaneous UI Tools

[Datastore client](https://github.com/qiangli/franchise) for Sqlite, PostgreSQL, and MySQL.

[Redis client](https://github.com/qiangli/redis-commander)

These tools are compatible and could be used with official PostgresSQL/MySQL/Redis servers but are setup to access the embedded/in-memory backing stores for the AI Commandline Tool [Hub services](https://github.com/qiangli/ai#hub-services).
