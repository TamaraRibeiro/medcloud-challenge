-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birth" TEXT NOT NULL,
    "cpf" TEXT,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "addressNumber" TEXT NOT NULL,
    "complement" TEXT,
    "neighbourhood" TEXT NOT NULL,
    "city" TEXT,
    "uf" TEXT,
    "country" TEXT
);
