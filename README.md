# Minimum template for full-stack development with NestJS and React.

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
API_URL=
CLIENT_URL=
DB_USER=
DB_PASSWORD=
DB_NAME=
ACCESS_TIME=
ACCESS_SECRET=
REFRESH_TIME=
REFRESH_SECRET=
RESET_PASSWORD_SECRET=
```