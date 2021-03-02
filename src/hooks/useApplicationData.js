import { useState, useEffect } from 'react'

import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {

    const p1 = axios.get("/api/days");
    const p2 = axios.get("/api/appointments");
    const p3 = axios.get("/api/interviewers");

    Promise.all([p1, p2, p3])
      .then(([days, appointments, interviewers]) => {

        setState(prev => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        }));

      })
      .catch(error => console.log(error))
  }, []);


  const setDay = day => setState({ ...state, day })

  const spotsRemaing = (state, appointments) => {
    let appointmentsArray = [];

    const filteredDays = state.days.filter(dayItem => dayItem.name === state.day);

    filteredDays[0].appointments.forEach((element) => {
      appointmentsArray.push(appointments[element]);
    })

    let remainingSpots = 0;
    appointmentsArray.forEach((appointmentObj) => {
      if (!appointmentObj.interview) {
        remainingSpots++
      }
      return remainingSpots
    })

    //Creating newDays array that has days array with updated spots
    let newDays = [];
    state.days.forEach((dayObj) => {
      if (dayObj.name === state.day) {
        dayObj.spots = remainingSpots
        newDays.push(dayObj);
      } else {
        newDays.push(dayObj);
      }
    })
    return newDays;
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments, days: spotsRemaing(state, appointments) });
      })
  }


  const cancelInterview = (id) => {
         
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments, 
      [id]: appointment
    };
   
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() =>  {
      setState({...state, appointments, days: spotsRemaing(state, appointments)});
    })
  };

  return { state, bookInterview, cancelInterview, setDay }
} 
