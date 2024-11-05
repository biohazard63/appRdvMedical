"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

interface LoginInput {
    email: string;
    password: string;
}

export async function loginAction({ email, password }: LoginInput) {
    const isValidUser = await authenticateUser(email, password);

    if (isValidUser) {
        cookies().set("session_token", "generated_session_token", { httpOnly: true, path: "/" });
        return { success: true };
    } else {
        return { success: false, error: "Email ou mot de passe incorrect" };
    }
}

async function authenticateUser(email: string, password: string): Promise<boolean> {
    try {
        const user = await prisma.utilisateur.findUnique({
            where: { email },
        });

        if (user && user.motDePasse === password) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Erreur lors de l'authentification :", error);
        return false;
    }
}