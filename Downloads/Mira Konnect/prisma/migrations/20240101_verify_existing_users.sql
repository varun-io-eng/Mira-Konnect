-- Mark all existing users as email verified so they don't get locked out
UPDATE "User" SET "emailVerified" = NOW() WHERE "emailVerified" IS NULL;
