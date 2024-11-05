'use client';
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useDateContext } from "@/context/DateContext";
import { getWeekDates, fetchAppointmentsForWeek } from "@/lib/utils";
import { useEffect, useState } from "react";


export default function Page() {

  const { selectedDate } = useDateContext();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      const appointments = await fetchAppointmentsForWeek(selectedDate);
      setAppointments(appointments);
    }
    loadAppointments();
  }, [selectedDate]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>October 2024</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            <div className="dashboard-content">
              <h1>Rendez-vous de la Semaine</h1>
              <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                      {new Date(appointment.dateHeure).toLocaleString()} - {appointment.description}
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
