# Minimum template for full-stack development with NestJS and React.

What is in the template?

- Authorization by JWT
- Integration with Cloudinary
- Swagger docs
- Configured queue and orm
- Static service
- Pretty emails
- ...

Install project:

- ` git clone https://github.com/alexKudryavtsev-web/template-nestjs-react.git`

- `npm install`

In addition, you need to install programs: MySQL and Redis.

Developed on Linux, so the desired operating system is Linux

Initialize the database:

- `npm run db:migrate`
- `npm run db:seed`

Develope command:

`npm start`

See project swagger documentation:

`http://localhost:3000/api`

.env template:

```
MAIL_USER=
MAIL_PASSWORD=

SERVER_PORT=3000
API_URL=http://localhost:3000/api
CLIENT_URL=http://localhost:3001

DB_USER=
DB_PASSWORD=
DB_NAME=

ACCESS_TIME=15m
ACCESS_SECRET=
REFRESH_TIME=30d
REFRESH_TIME_IN_MS=2592000000
REFRESH_SECRET=
RESET_PASSWORD_TIME=1h
RESET_PASSWORD_SECRET=

REDIS_HOST=localhost
REDIS_PORT=6379

TTL=60
LIMIT=10

CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```
