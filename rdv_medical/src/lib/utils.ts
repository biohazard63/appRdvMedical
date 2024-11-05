import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWeekDates(startDate: Date) {
  const dates = [];
  const dayOfWeek = startDate.getDay(); // Jour actuel de la semaine (0 pour Dimanche, 6 pour Samedi)
  const startOfWeek = new Date(startDate);
  startOfWeek.setDate(startDate.getDate() - dayOfWeek); // Premier jour de la semaine

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date);
  }

  return dates;
}

export async function fetchAppointmentsForWeek(dates: Date[]) {
  // Exemple d'appel API pour récupérer les rendez-vous d'une semaine entière
  const response = await fetch(`/api/appointments?dates=${dates.join(",")}`);
  return await response.json();
}
