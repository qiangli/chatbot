# AI Chatbot

AI Chatbot is a chat web app built with vite+react+nextjs to work with the [AI Command Line Tool](https://github.com/qiangli/ai) hub service.

### Widget

![Wdiget UI image](./widget/docs/chatbot-ui.png)

### Web UI

![Web UI image](./assistant/docs/web-ui.png)

### Chrome Extension - Toolbar

![Toolbar UI image](./assistant/docs/toolbar-ui.png)

### VSCode Extension - Sidebar

![Sidebar UI image](./widget/docs/sidebar-ui.png)


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

* Visit UI
  [http://localhost:18083](http://localhost:18083)

* Install extensions
  [extensions](extension/)

## Miscellaneous UI Tools

[Datastore client](https://github.com/qiangli/franchise) for Sqlite, PostgreSQL, and MySQL.

[Redis client](https://github.com/qiangli/redis-commander)

These tools are compatible and could be used with official PostgresSQL/MySQL/Redis servers but are setup to access the embedded/in-memory backing stores for the AI Commandline Tool [Hub services](https://github.com/qiangli/ai#hub-services).
