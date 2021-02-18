export function getAppointmentsForDay(state, day) {
    //... returns an array of appointments for that day
    
    let newArray = [];

    const filteredDays = state.days.filter(dayItem => dayItem.name === day);

    if (filteredDays.length === 0){  
        return newArray;
    }   

    filteredDays[0].appointments.forEach((element) => {
        newArray.push(state.appointments[element]);
    })

    return newArray;
}

export function getInterview(state, interview) {
    
    if(!interview) return null;

    const interviewer = state.interviewers[interview.interviewer]
    return {...interview , interviewer}
} 