# Fruit Storage System Demo

The details is available in the following Notion page: 

[![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)](https://www.notion.so/skandio/DDD-Task-681ae75a799b4bd392c658f8eeedc595?pvs=4)



<!-- This repo is about a demo of backend application using DDD (Domain Driven Design) approach. -->

## Packages

[![apollo-server](https://img.shields.io/badge/apollo--server-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)](https://www.npmjs.com/package/apollo-server)
[![graphql](https://img.shields.io/badge/graphql-E434AA?style=for-the-badge&logo=graphql&logoColor=white)](https://www.npmjs.com/package/graphql)
[![nexus](https://img.shields.io/badge/nexus-5D2E8C?style=for-the-badge&logo=nexus&logoColor=white)](https://www.npmjs.com/package/nexus)
[![mongoose](https://img.shields.io/badge/mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://www.npmjs.com/package/mongoose)
[![node-cron](https://img.shields.io/badge/node--cron-89CFF0?style=for-the-badge&logo=node-cron&logoColor=white)](https://www.npmjs.com/package/node-cron)
[![jest](https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://www.npmjs.com/package/jest)
[![typescript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.npmjs.com/package/typescript)


## One-line Installation

You need to install neccessary packages for the project. You can do it by running the following command:

```sh
npm install apollo-server graphql nexus mongoose node-cron jest typescript ts-node ts-jest @types/node @types/jest @types/mongoose @types/graphql
```

## To-do list
### Project Setup

- [x] Set up a new Node.js project with TypeScript, Mongoose, Jest, and Nexus.
- [x] Configure linters, precommit hooks, and other development tools.

### Domain Design

- [x] Design the project folder structure following Domain Driven Design principles.
- [x] Create the Fruit domain model, including Value Objects for name and description.
- [x] Implement a Fruit Factory to create new Fruit instances.
- [x] Implement a Fruit Repository to manage storage and retrieval of fruits.

### Mappers & Services

- [x] Implement mappers to convert between database objects and domain objects.
- [x] Develop Domain Services to handle unique fruit name checks and other business logic.

### GraphQL

- [x] Set up the GraphQL schema generation using Nexus.
- [x] Implement the GraphQL mutations and queries with appropriate input validation.

### Domain Events

- [x] Create a mechanism to emit domain events with guaranteed at least once delivery.

### Testing

- [ ] Write acceptance tests for the mutations and query as described in the task.
- [ ] Implement any additional unit or integration tests to ensure code quality.

### Code Review & Optimization

- [ ] Review the code and optimize for readability, maintainability, and performance.





## Structure
The structure of the project is as follows:

```css
src/
├── server.ts 
├── domain/
│   ├── entities/
│   │   └── Fruit.ts
│   ├── valueObjects/
│   │   └── Description.ts
│   ├── factories/
│   │   └── FruitFactory.ts
│   ├── repositories/
│   │   └── FruitRepository.ts
│   ├── services/
|   |   ├── FruitStorageService.ts 
│   │   └── UniqueFruitNameService.ts
│   └── events/
│       └── FruitDomainEventEmitter.ts
|
├── graphql/
│   ├── types/
│   │   ├── FruitType.ts 
│   │   ├── storeFruitToFruitStorage.ts 
│   │   ├── removeFruitFromFruitStorage.ts 
│   │   ├── createFruitForFruitStorage.ts 
│   │   ├── updateFruitForFruitStorage.ts 
│   │   ├── deleteFruitFromFruitStorage.ts 
│   │   ├── findFruit.ts 
│   │   └── index.ts 
│   ├── context.ts 
│   └── schema.ts 
|
└── infrastructure/
    ├── database/
    │   └── mongoose/
    │       ├── models/
    │       │   └── FruitModel.ts
    │       └── repositories/
    │           └── MongooseFruitRepository.ts
    └── mappers/
        └── FruitMapper.ts
```

### Details
1. `src/`: The root folder of the source code.
2. `domain/`: This folder contains the domain layer of the application, which represents the core business logic.
    - `entities/`: Contains the entity classes, like `Fruit.ts`, which define the main building blocks of the domain model.
    - `valueObjects/`: Contains value objects, like `Description.ts`, which are immutable and represent specific aspects of the domain model.
    - `factories/`: Contains factory classes, like `FruitFactory.ts`, which are responsible for creating instances of entities or value objects.
    - `repositories/`: Contains repository interfaces, like `FruitRepository.ts`, which define the contracts for data access and storage.
    - `services/`: Contains domain services, like `UniqueFruitNameService.ts`, which encapsulate domain logic that doesn't fit within a specific entity or value object, and `FruitStorageService.ts`, which encapsulates the business logic for the fruit storage system.
    - `events/`: Contains domain event-related classes, like `FruitDomainEventEmitter.ts`, which handle and manage events generated by the domain layer.
3. `graphql/`: This folder contains the GraphQL-related code.
    - `types/`: Contains GraphQL type definitions and resolvers.
        - `FruitType.ts`: Contains the GraphQL type definition for the `Fruit` entity.
        - `storeFruitToFruitStorage.ts`: Contains the GraphQL mutation for storing a fruit in the fruit storage system.
        - `removeFruitFromFruitStorage.ts`: Contains the GraphQL mutation for removing a fruit from the fruit storage system.
        - `createFruitForFruitStorage.ts`: Contains the GraphQL mutation for creating a new fruit.
        - `updateFruitForFruitStorage.ts`: Contains the GraphQL mutation for updating an existing fruit.
        - `deleteFruitFromFruitStorage.ts`: Contains the GraphQL mutation for deleting an existing fruit.
        - `findFruit.ts`: Contains the GraphQL query for finding a fruit by its name.
        - `index.ts`: Contains the GraphQL type definitions and resolvers for the application.
    - `context.ts`: Contains the GraphQL context setup, which is responsible for setting up and managing the context passed to resolvers.
    - `schema.ts`: Contains the GraphQL schema definition, including type definitions, queries, and mutations.
4. `infrastructure/`: This folder contains the infrastructure layer of the application, which deals with external concerns like data storage and communication.
    - `database/`: Contains the database-related code.
        - `mongoose/`: Contains the Mongoose-specific code for the application.
            - `models/`: Contains the Mongoose schema and model definitions, like `FruitModel.ts`.
            - `repositories/`: Contains the Mongoose-based repository implementations, like `MongooseFruitRepository.ts`, which handle data access and storage using Mongoose.
    - `mappers/`: Contains the mapper classes, like `FruitMapper.ts`, which handle the conversion of domain objects to database models and vice versa.
5. `server.ts`: The entry point of the application, which sets up the server and starts it.


### Why this structure?
This structure helps to maintain a **clean** architecture, where the domain layer is separated from external concerns, like data access and APIs. This makes the code **more maintainable**, **testable**, and **easier to understand**, as each part of the system has a clearly defined purpose.


## Code Quality
The code quality is maintained using the following tools:
1. [ESLint](https://eslint.org/): A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
2. [Prettier](https://prettier.io/): An opinionated code formatter.
