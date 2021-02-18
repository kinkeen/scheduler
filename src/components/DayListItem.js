import React from "react";

import "components/DayListItem.scss";
const classnames = require('classnames')

export default function DayListItem(props) {

    const basicClass = "day-list__item";
    const selectedClass = "day-list__item--selected";
    const fullClass = "day-list__item--full";
    let dayListClass = basicClass;
    let dayListText = "";
    
    if(props.selected){
        dayListClass += ` ${selectedClass}`
    } 
    
    let spotsLeft = props.spots;

    if (spotsLeft === 0){
        dayListText = "no spots remaining";
        dayListClass += ` ${fullClass}` 
    }else if (spotsLeft  < 5) { 
    
        dayListText  = `${spotsLeft} spot${spotsLeft>1? "s":""} remaining`;
    } 

    return (
        <li className={dayListClass} onClick={()=>{props.setDay(props.name)}}  data-testid="day">
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{dayListText}</h3>
        </li>
    );
}