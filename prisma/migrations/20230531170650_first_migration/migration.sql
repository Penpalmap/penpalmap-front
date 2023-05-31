-- CreateTable
CREATE TABLE "countries" (
    "country_id" SMALLSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "flag" VARCHAR,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "interests" (
    "interest_id" SMALLSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "icon" VARCHAR,

    CONSTRAINT "interests_pkey" PRIMARY KEY ("interest_id")
);

-- CreateTable
CREATE TABLE "languages" (
    "language_id" SMALLSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("language_id")
);

-- CreateTable
CREATE TABLE "mails" (
    "mail_id" BIGSERIAL NOT NULL,
    "to" VARCHAR,
    "created_at" DATE,

    CONSTRAINT "mails_pkey" PRIMARY KEY ("mail_id")
);

-- CreateTable
CREATE TABLE "messages" (
    "message_id" BIGSERIAL NOT NULL,
    "room_id" VARCHAR NOT NULL,
    "text" TEXT,
    "sender_id" VARCHAR,
    "seen" BOOLEAN,
    "created_at" TIMESTAMPTZ(6),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "room_users" (
    "room_id" VARCHAR NOT NULL,
    "user_id" VARCHAR NOT NULL
);

-- CreateTable
CREATE TABLE "rooms" (
    "room_id" VARCHAR NOT NULL,
    "created_at" DATE,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "user_id" VARCHAR NOT NULL,
    "gender" VARCHAR,
    "birthdate" DATE,
    "description" TEXT,
    "work" VARCHAR,
    "education" VARCHAR,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_images" (
    "user_id" VARCHAR NOT NULL,
    "src" VARCHAR,
    "position" SMALLINT NOT NULL
);

-- CreateTable
CREATE TABLE "user_interests" (
    "user_id" VARCHAR NOT NULL,
    "interest_id" SMALLINT NOT NULL
);

-- CreateTable
CREATE TABLE "user_languages" (
    "user_id" VARCHAR NOT NULL,
    "language_id" SMALLINT NOT NULL
);

-- CreateTable
CREATE TABLE "user_settings" (
    "user_id" VARCHAR NOT NULL,
    "age_preference" SMALLINT[],
    "country_preference" VARCHAR[],

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" VARCHAR NOT NULL,
    "name" VARCHAR,
    "email" VARCHAR,
    "password" VARCHAR,
    "googleid" VARCHAR,
    "longitude" REAL,
    "latitude" REAL,
    "geom" VARCHAR,
    "account_completed" BOOLEAN,
    "profile_completed" BOOLEAN,
    "img_small" VARCHAR,
    "points" BIGINT DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "users_fictive" (
    "latitude" REAL,
    "longitude" REAL,
    "image_url" VARCHAR
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "messages_room_fkey" ON "messages"("room_id");

-- CreateIndex
CREATE INDEX "fki_f" ON "room_users"("user_id");

-- CreateIndex
CREATE INDEX "fki_room_fkey" ON "room_users"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "room_users_room_id_user_id_key" ON "room_users"("room_id", "user_id");

-- CreateIndex
CREATE INDEX "fki_user_fkey" ON "user_details"("user_id");

-- CreateIndex
CREATE INDEX "fki_s" ON "user_images"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_images_user_id_position_key" ON "user_images"("user_id", "position");

-- CreateIndex
CREATE INDEX "fki_interest_fkey" ON "user_interests"("interest_id");

-- CreateIndex
CREATE INDEX "fki_language_fkey" ON "user_languages"("language_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "msg_room_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("room_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "room_users" ADD CONSTRAINT "room_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("room_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "room_users" ADD CONSTRAINT "user_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_images" ADD CONSTRAINT "user_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "interest_fkey" FOREIGN KEY ("interest_id") REFERENCES "interests"("interest_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "user_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_languages" ADD CONSTRAINT "language_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("language_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_languages" ADD CONSTRAINT "user_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
