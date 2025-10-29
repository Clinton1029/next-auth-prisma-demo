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



🧱 5. Run the First Migration

This applies your schema to the PostgreSQL database.

npx prisma migrate dev --name init

✅ This command:

Creates your database if it doesn’t exist

Creates your tables

Generates the Prisma Client




⚙️ STEP 5 b: Test Database Connection

Now test if Prisma can connect to PostgreSQL successfully:

npx prisma db pull

Expected output:

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
✔ Introspected 0 models and wrote them into prisma/schema.prisma

✅ If you see that — it means Prisma is connected to PostgreSQL successfully 🎉




⚡ 6. Generate the Prisma Client (Optional)

npx prisma generate

This regenerates your Prisma Client inside node_modules/@prisma/client.




🌱 7. Seed Initial Data (Optional)

You can add initial data for testing.

Create a new file: prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "broly@demo.com",
      name: "Clinton Yade",
      password: "123456",
      posts: {
        create: [
          { title: "Welcome to Prisma", content: "My first post", published: true },
          { title: "Next.js + Prisma = ❤️", content: "Power combo!", published: false },
        ],
      },
    },
  });
}

main()
  .then(() => console.log("✅ Database seeded successfully"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());


Run it:
npx tsx prisma/seed.ts





🔗 8. Create a Reusable Prisma Client

Create lib/prisma.ts:

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


Use it anywhere in your project:

import { prisma } from "@/lib/prisma";





🧠 9. CRUD Operations Examples
🟢 Create User

await prisma.user.create({
  data: {
    email: "clinton@demo.com",
    password: "123456",
    name: "Clinton Yade",
  },
});



🔵 Read Users

const users = await prisma.user.findMany({
  include: { posts: true },
});


🟡 Update User

await prisma.user.update({
  where: { id: 1 },
  data: { name: "Clinton Updated" },
});


🔴 Delete User

await prisma.user.delete({ where: { id: 2 } });







10. Use Prisma in API Routes (Next.js Example)

Example: app/api/users/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({ include: { posts: true } });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const newUser = await prisma.user.create({ data: { email, password } });
  return NextResponse.json(newUser);
}





📊 11. Open Prisma Studio

Prisma Studio is a visual database editor.

npx prisma studio


Then open your browser at 👉 http://localhost:5555

You can view and edit your PostgreSQL data visually!





🧰 12. Useful Prisma Commands


| Command                              | Description                   |
| ------------------------------------ | ----------------------------- |
| `npx prisma init`                    | Initialize Prisma             |
| `npx prisma migrate dev --name init` | Run migrations                |
| `npx prisma generate`                | Regenerate client             |
| `npx prisma db push`                 | Push schema without migration |
| `npx prisma studio`                  | Open Prisma GUI               |
| `npx prisma format`                  | Format your Prisma schema     |







🚀 13. Example Folder Structure


prisma-postgres-demo/
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ lib/
│  └─ prisma.ts
├─ app/
│  ├─ api/
│  │  └─ users/
│  │     └─ route.ts
├─ .env
├─ package.json
└─ README.md





✅ FINAL CHECKLIST


| Step | Command                                        | Purpose                          | Expected Result                         |
| ---- | ---------------------------------------------- | -------------------------------- | --------------------------------------- |
| 1    | `npm install prisma --save-dev @prisma/client` | Install Prisma CLI + client      | Packages added                          |
| 2    | `npx prisma init`                              | Initialize Prisma                | Creates `.env` + `prisma/schema.prisma` |
| 3    | Edit `.env`                                    | Add PostgreSQL connection string | `DATABASE_URL` set                      |
| 4    | `createdb authdb`                              | Create database (if needed)      | Database ready                          |
| 5    | `npx prisma db pull`                           | Test connection                  | Connection successful                   |
| 6    | `npx prisma generate`                          | Generate client                  | Prisma Client created                   |
| 7    | `npx prisma studio`                            | Open Studio                      | Visual DB explorer                      |



💡 Now Prisma is 100% set up and automatically connected to PostgreSQL!
You can start defining models like User, Post, etc. in prisma/schema.prisma.




```



🧠 Summary

✅ You’ve learned:

How to install and initialize Prisma

How to connect to PostgreSQL

How to define models and run migrations

How to seed, query, and manage data

How to integrate Prisma with your app
