# FoundIt - Lost and Found System

This project is a lost and found management system with authentication with JWT. In this project User can register, login, report found items, claim found items.
Found items , and users data are stored in PostgresSQL. In this project [Prisma](https://www.prisma.io/) (Prisma is an ORM (Object-Relational Mapping) specifically designed for SQL databases like Postgres, MySQL, MariaDB, and SQLite. It allows you to interact with your database using modern JavaScript syntax and abstracts away a lot of the complexity of dealing with databases directly.)

- The system ensures that sensitive information (e.g., passwords) is not included in response data.
- JWT tokens are used for secure user authentication and authorization.
- JWT tokens will expire after 30 days.
- After user login, access token is generated and assigned to the user.
- While registering, users are required to provide a unique email.
- The system ensures that a user can only register once.
- User can report found items, and claim found items.
- User can view reported items and can filter them to view specific items based on their needs.
- Use can view my profile. In order to view my profile, user must be logged in. User is taken from the access token that was assigned to the user during login.
- User can update their profile.
- Several routes require access token to be viewed, if token is not provided, an error will be shown.
- In this project error is handled by creating `global error handler` middleware.
- For zod errors, error response is customized.
- While registering user data is saved in User table and UserProfile table. This was achieved using Prisma (transaction).
- Prisma is used for database operations. It provides several advantages such as it allows to write database logic in JavaScript, it supports transaction, it provides good type safety, it allows to define database relationships using Prisma schema, it provides good error messages, it generates GraphQL schema from Prisma schema, it provides good documentation and it is actively maintained.
- Validation is done using Zod.
- This project has been deployed on Vercel.
- Database is hosted on Supabase.

## Tools Used

- [TypeScript](https://www.typescriptlang.org/) - TypeScript
- [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
- [Express.js](https://expressjs.com/) - Node.js framework
- [PostgresSQL](https://www.postgresql.org/) - PostgreSQL is a powerful, open source object-relational database system.
- [Prisma](https://www.prisma.io/) - Prisma is an ORM specifically designed for SQL databases like Postgres, MySQL and used for database operations
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing and salting
- [JWT](https://jwt.io/) - JSON Web Token
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables
- [Zod](https://zod.dev/) - TypeScript validation
- [http status](https://www.npmjs.com/package/http-status) - Utility to interact with HTTP status codes.
- [Vercel](https://vercel.com/) - (Vercel) Serverless platform for hosting Node.js applications
- [Supabase](https://supabase.com/) - Open source Firebase alternative, for hosting PostgresSQL database

# [Deployed Server Link](https://assignment-8-self.vercel.app/)

# Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-sajid1545.git
```

### Go to the project directory

```bash
cd .\l2-b2-fullstack-track-assignment-8-sajid1545\
```

## 2. Install the dependencies

```bash
yarn install
```

## 3. Rename the file named `.env.example` to `.env` and then Add yours environment variables

## 4. Start the server

```bash
yarn dev
```

<br>
<br>
