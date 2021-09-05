# katana-test

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

This contains a deck model, a deck controller, and a deck repository that uses an in-memory data source.

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## Tests

There a unit tests for deck controller and integration test for deck controller and repository.

```sh
npm test
```

## Routes

Create a deck

`POST /decks`

```
curl --request POST \
  --url http://localhost:3000/decks \
  --header 'Content-Type: application/json' \
  --data '{
	"shuffled": false,
	"remaining": 52
}'
```

Open a deck

`GET /deck/:id/open`

```
curl --request GET --url http://localhost:3000/decks/d3625aad-a971-4cb8-acf7-6635f1179eaa/open
```

Draw cards

`GET /decks/:id/draw?count=1`

```
curl --request GET --url 'http://localhost:3000/decks/d3625aad-a971-4cb8-acf7-6635f1179eaa/draw?count=60'
```
