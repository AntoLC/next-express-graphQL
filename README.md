# Next - Express - GraphQL - Project all configured
## You just have to start coding

Clean Install with:
* Next, React, Jest - one container
* Express, Mongoose, GraphQL, Sentry, Jasmine, Jest - one container
* MongoDB - one container
* mongo-express - one container
* All Dockerised

## Getting Started

You can configure the environnement by editing .env, as it is now it is working: 
```
./.env
```
You can change the name of the applications (NAME_APP) in the dockerfile:
```
./next/dockerfile
./server/dockerfile
```
Just be careful that the folder inside next has the same name as the application.
```
./next/your_next
```

### Path Access
Next.js: http://localhost:2502/
Express: http://localhost:2501/
MongoDB: http://localhost:2499/
GraphQL: http://localhost:2501/graphQL

### Prerequisites

Docker

### Installing

```
docker-compose up --build
```

# Enjoy ;)

## Authors

* **Anthony LC** (https://github.com/AntoLC)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
