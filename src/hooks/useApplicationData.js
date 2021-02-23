import {useState, useEffect} from 'react'

import axios from 'axios'


export default function useApplicationData() {

    const [state, setState] = useState({
        day: "Monday",
        days:[],
        appointments:{}
      });


      useEffect (() => {
        Promise.all ([
          Promise.resolve(axios.get("/api/days")),
          Promise.resolve(axios.get("/api/appointments")),
          Promise.resolve(axios.get("/api/interviewers"))
        ])
        .then ((all) => {
          setState (prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
        })
        .catch(error => console.log(error))
      },[]);


      const setDay = day => setState({...state, day })

      const spotsRemaing = (state,appointments) => {
        let appointmentsArray = [];

        const filteredDays = state.days.filter(dayItem => dayItem.name === state.day);

        filteredDays[0].appointments.forEach((element) => {
            appointmentsArray.push(appointments[element]);
        })

        let remainingSpots = 0;
        appointmentsArray.forEach((appointmentObj) => {
            if(!appointmentObj.interview) {
                remainingSpots++
            }
            return remainingSpots
        })

        let newDays = [];
        state.days.forEach((dayObj) => {
            if(dayObj.name === state.day){
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
            setState({...state, appointments, days: spotsRemaing(state, appointments)});
        })
      }


      const cancelInterview = (id) => {

        const appointment = {
          ...state.appointments[id],
          interview: null
        }

        const appointments = {
          ...state.appointments, 
          [id]: appointment
        }

        return axios.delete(`/api/appointments/${id}`, appointment)
        .then(() =>  {
            setState({...state, appointments, days: spotsRemaing(state, appointments)});
        })
      }

      return {state, bookInterview, cancelInterview, setDay}
} 
