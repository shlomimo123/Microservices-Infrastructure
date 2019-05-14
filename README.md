# Example using inversify-express-example boilerplate
reference: https://github.com/inversify/inversify-express-example

## General information

This repo contains infrustructure to ExpressJS server app with Redis, MongoDB and Inversify for IOC. All are chained with docker compose

## Used Packages

Middleware                                              | Reason
------------------------------------------------------- | --------------------------------------------------------------------------------------------------------
[body-parser](https://github.com/expressjs/body-parser) | We need to access the body of a request
[helmet](https://github.com/helmetjs/helmet)            | Adds some protection to the application and removes things like the `X-Powered-By header` from a request
[winston](https://www.npmjs.com/package/winston)                                               | Used for logging

## How to use this exanple

Run the folowing commands:
1) docker-compose down
2) docker-compose build
3) docker-compose up


## How to test
We have to http methods

HTTP                                                    | How to use example
------------------------------------------------------- | --------------------------------------------------------------------------------------------------------
`POST`                                                  | <b>URL </b>http://localhost:3000/Message</br><b>Body </b>{"firstName":"vvvvvv"}</br><b>Headers</b>crossfw-referer:website.com
`GET`                                                   |<b>URL </b>http://localhost:3000/Message?domain=website.com&from=2019-05-13T07:16:37.449Z&&until=2019-05-15T07:16:37.449Z&skip=0&limit=0 


## How to scale
this repo uses nginx as revered proxy

for scale run this command:

`**docker-compose scale web=3**`

Now you can check that everything is still working


## How to run in development with ts-node
1)`git clone https://github.com/shlomimo123/MoonshotExam.git`
2)`npm install`
3)`Docker-compose down`
4)`Docker-compose build`
5)`docker-compose up -d mongo`
6)`docker-compose up -d redis`
7)`ts-node bootstrap`

Enjoy ;)
