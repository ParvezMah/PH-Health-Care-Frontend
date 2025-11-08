import { Hero } from "@/components/modules/Home/Hero";
import Specialities from "@/components/modules/Home/Specialties";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Specialities />
        <TopRatedDoctors />
        <Steps />
        <Testimonials />
      </main>
    </>
  );
}


// Pages Structure:
// Pablic Pages : Home, About Us, Contact Us
// Auth Pages : Login, Register, Forgot Password, Reset Password
// Patient Pages : Dashboard, dashboard/my-profile, dashboard/book-appointment, dashboard/appointments, dashboard/prescriptions, dashboard/billing, dashboard/settings
// Admin Dashboard : Patient Management, Doctor Management, Appointment Management, /admin/dashboard, /admin/dashbaord/patient-management, /admin/dashboard/doctor-management, /admin/dashboard/appointment-management
// Doctor Dashboard : My Profile, Appointments, My Schedule, /doctor/dashboard, /doctor/my-profile, /doctor/appointments.
// Error Pages : 404 Not Found, 500 Internal Server Error