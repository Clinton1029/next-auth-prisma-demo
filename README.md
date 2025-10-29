This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 🚀 Prisma + PostgreSQL Crash Course (Full Guide)

A complete step-by-step guide for setting up Prisma ORM with PostgreSQL — perfect for integration with Next.js or any Node.js project.



```bash
🧩 1. Install Dependencies

npm install prisma --save-dev
npm install @prisma/client

Explanation:

prisma: CLI tool used for schema, migrations, and generation.

@prisma/client: The auto-generated client for your project to query your database.


⚙️ 2. Initialize Prisma

npx prisma init

This creates two files:

prisma/
 └── schema.prisma   ← your database schema
.env                ← environment variables




🗄️ 3. Set Up PostgreSQL Connection

Edit your .env file and set your PostgreSQL connection string:

DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/prisma_demo?schema=public"

🧠 Replace yourpassword with your actual PostgreSQL password.



✏️ 4. Define Your Prisma Models

Open prisma/schema.prisma and define your models:

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}






```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
