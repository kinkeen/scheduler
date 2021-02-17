import React from "react";

import "components/DayListItem.scss";
const classnames = require('classnames')

export default function DayListItem(props) {
    const formatSpots = function(spotsLeft) {
        if (spotsLeft === 0) return "no spots remaining";
        if (spotsLeft  < 5)  return `${spotsLeft} spot${spotsLeft>1? "s":""} remaining`;
        return spotsLeft;
    }

    let dayListClass;
    if(props.spots === 0) dayListClass = classnames(`day-list__item--full`)
    if(props.selected) dayListClass = classnames(`day-list__item--selected`)
    else dayListClass = classnames(`day-list__item`)
    
    return (
        <li className={dayListClass} onClick={()=>{props.setDay(props.name)}}  data-testid="day">
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{formatSpots(props.spots)}</h3>
        </li>
    );
}