# Migration `20200811063513-initial`

This migration has been generated at 8/11/2020, 12:05:13 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Instructor', 'Student');

CREATE TABLE "public"."User" (
"id" SERIAL,
"email" text  NOT NULL ,
"password" text  NOT NULL ,
"name" text  NOT NULL ,
"role" "UserRole" NOT NULL DEFAULT E'Student',
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Course" (
"id" SERIAL,
"title" text  NOT NULL ,
"description" text  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id"))

CREATE TABLE "public"."_CourseToUser" (
"A" integer  NOT NULL ,
"B" integer  NOT NULL )

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

CREATE UNIQUE INDEX "Course.title_unique" ON "public"."Course"("title")

CREATE UNIQUE INDEX "_CourseToUser_AB_unique" ON "public"."_CourseToUser"("A","B")

CREATE  INDEX "_CourseToUser_B_index" ON "public"."_CourseToUser"("B")

ALTER TABLE "public"."_CourseToUser" ADD FOREIGN KEY ("A")REFERENCES "public"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_CourseToUser" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200811063513-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,35 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id        Int      @id @default(autoincrement())
+  email     String   @unique
+  password  String
+  name      String
+  role      UserRole @default(Student)
+  createdAt DateTime @default(now())
+  courses   Course[] @relation(references: [id])
+}
+
+model Course {
+  id          Int      @id @default(autoincrement())
+  title       String   @unique
+  description String
+  createdAt   DateTime @default(now())
+  users       User[]   @relation(references: [id])
+}
+
+enum UserRole {
+  Admin
+  Instructor
+  Student
+}
```


