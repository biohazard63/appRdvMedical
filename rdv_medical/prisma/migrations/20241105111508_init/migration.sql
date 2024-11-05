-- CreateEnum
CREATE TYPE "Role" AS ENUM ('secretaire', 'medecin', 'patient');

-- CreateEnum
CREATE TYPE "Vue" AS ENUM ('jour', 'semaine', 'mois');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Secretaire" (
    "id" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,

    CONSTRAINT "Secretaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medecin" (
    "id" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "specialite" TEXT NOT NULL,

    CONSTRAINT "Medecin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RendezVous" (
    "id" SERIAL NOT NULL,
    "dateHeure" TIMESTAMP(3) NOT NULL,
    "typeConsultation" TEXT NOT NULL,
    "medecinId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "note" TEXT,

    CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calendrier" (
    "id" SERIAL NOT NULL,
    "vue" "Vue" NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Calendrier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rapport" (
    "id" SERIAL NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "nombreRendezVous" INTEGER NOT NULL,
    "nombreRendezVousParType" JSONB NOT NULL,
    "nombreRendezVousParMedecin" JSONB NOT NULL,

    CONSTRAINT "Rapport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Secretaire_utilisateurId_key" ON "Secretaire"("utilisateurId");

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_utilisateurId_key" ON "Medecin"("utilisateurId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_utilisateurId_key" ON "Patient"("utilisateurId");

-- AddForeignKey
ALTER TABLE "Secretaire" ADD CONSTRAINT "Secretaire_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medecin" ADD CONSTRAINT "Medecin_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
