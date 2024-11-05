"use server";

import { prisma } from "@/lib/prisma";
import { startOfWeek, endOfWeek } from "date-fns";

export async function fetchAppointmentsForWeek(selectedDate: Date) {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDate, { weekStartsOn: 1 });

    // Utilisez Prisma pour récupérer les rendez-vous pour la semaine sélectionnée
    const appointments = await prisma.rendezVous.findMany({
        where: {
            dateHeure: {
                gte: start,
                lte: end,
            },
        },
        orderBy: { dateHeure: "asc" },
    });

    return appointments;
}