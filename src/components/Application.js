import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import  useApplicationData  from "../hooks/useApplicationData";


export default function Application() {

  const { state, bookInterview, cancelInterview, setDay } = useApplicationData();
  const dailyAppointments =  getAppointmentsForDay(state, state.day);
  const schedulesData = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return( 
      <Appointment 
        key={appointment.id} 
        id={appointment.id} 
        time={appointment.time} 
        interviewers={interviewers} 
        interview={interview} 
        bookInterview={bookInterview} 
        cancelInterview={cancelInterview}
        />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
          {schedulesData}
      </section>
    </main>
  );
 }


