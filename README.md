# Example using inversify-express-example boilerplate example
https://github.com/inversify/inversify-express-example

## General information

This repo contains infrustructure to ExpressJS server app with Redis, MongoDB and Inversify for IOC. All are chained with docker compose

## Used Middleware

Middleware                                              | Reason
------------------------------------------------------- | --------------------------------------------------------------------------------------------------------
[body-parser](https://github.com/expressjs/body-parser) | We need to access the body of a request
[helmet](https://github.com/helmetjs/helmet)            | Adds some protection to the application and removes things like the `X-Powered-By header` from a request
