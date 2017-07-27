# tsms-server

## Getting Started

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 6.x.x
- [x][Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

## Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `npm install nodemon -g` to install nodemon.

4. Run `npm start` to start the server.

## Build & development

[x] Run `gulp build` for building and `gulp serve` for preview.

## Testing

[x] Running `npm test` will run the unit tests with karma.
=======

## Logging
User `logger.[level]('my log statement')` to log the statement.
 - `level` can be any valid winston level (`silly`, `info`, `debug` etc).
 - `import logger from <path to componnet->logger-> index file`.
 


## Note
[x] Denotes the item that is not supported at this time, but will be supported in future.

