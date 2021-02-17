import React from "react";

import "components/DayListItem.scss";
const classnames = require('classnames')

export default function DayListItem(props) {

let dayListClass;
if(props.selected) dayListClass = classnames(`day-list__item--selected`)
else dayListClass = classnames(`day-list__item`)
if(props.spots === 0) dayListClass = classnames(`day-list__item--full`)

  return (
    <li className={dayListClass} onClick={()=>{props.setDay(props.name)}}  data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}