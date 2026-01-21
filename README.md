# Full-Stack Exam Project

## Requirements
- Node.js (LTS)
- PostgreSQL (running locally)
- npm

## Setup & Run

### Back-end
cd back-end

npm install

npm start

npx prisma migrate dev

npx ts-node util/seed.ts

Status: http://localhost:3000/status

Swagger: http://localhost:3000/api-docs

### Front-end

cd front-end

npm install

npm run dev

Application: http://localhost:8080
