# cm-colors-mosaic-api

This repository is the part of the ColorsMosaic project containing REST API of the application.

## Goal

The goal is to create a small REST API in Typescript. Application needs to be able to service frontend part of the application.

# Introduction

The idea for this application was to create a tool in the form of a website for viewing and creating color sets. It would help in creating mobile and web application projects.

This API was created for the the needs of the project involving two separate parts that make up a web application. This repository contains the backend part of the application and is responsible for connection the frontend part with database of the application. REST API can sign in a new user and sigh up already existing with using JWT for access and refresh token. Other functionalities include searching the database for saved user's colors and sets of colors. Database also contains pre created colors sets.

## Features

<div style="font-size: 17px">

-   [ ] User authentication
-   [ ] User authorization
-   [ ] Logout user
-   [ ] Account verification with mail
-   [ ] Saving new colors for users
-   [ ] Getting user's saved colors
-   [ ] Getting user's saved colors sets
-   [ ] Getting most popular colors from external sources
-   [ ] Getting pre created colors sets from external sources

</div>

## Requirements

<div style="font-size: 17px">

-   Express.js as the framework
-   MongoDB as database technology
-   Swagger in use for API documentation
-   User authentication is based on JWT access and refresh token
-   During user's authentication, the application will recognize user's agent
-   Pre created colors sets are fetch from external sources
-   Sessions will be stored in database in dedicated cluster
-   AccessToken expire after 15 minutes and refresh token after 1 year
-   Tests

</div>

# Installation Guide

[ work in progress ]

# Usage

[ Here will be a set of instructions to user this repository ]

# API Endpoints

|  HTTP  | Endpoint                  | Action                   |
| :----: | :------------------------ | :----------------------- |
|  POST  | /api/auth/register        | New user authentication  |
|  POST  | /api/auth/login           | User authorization       |
|  POST  | /api/auth/logout          | User logout              |
|  GET   | /api/user/colors          | Get user's colors        |
|  GET   | /api/user/colors-sets     | Get user's colors sets   |
|  POST  | /api/user/colors          | Save new user's color    |
| DELETE | /api/user/colors/:id      | Delete user's color      |
| DELETE | /api/user/colors-sets/:id | Delete user's colors set |

## Technologies and Tools

<div >
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest" title="Jest"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" alt="Swagger" title="Swagger"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/192108893-b1eed3c7-b2c4-4e1c-9e9f-c7e83637b33d.png" alt="WebStorm" title="WebStorm"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/>
</div>

## Structure

[ temporary demo ]

```
|
├── config
|   └──default
├── src
│   ├── controllers
│   ├── interfaces
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── App.ts
│   └── index.ts
├── .env
├── package-lock.json
├── package.json
└── tsconfig.json
```

<!--
    example source:
  https://github.com/mingrammer/go-todo-rest-api-example/blob/master/README.md

  https://medium.com/fbdevclagos/https-medium-com-sylvaelendu-part-6-documenting-your-api-4558cde4d44e

  https://raw.githubusercontent.com/mingrammer/go-todo-rest-api-example/master/README.md
 -->
