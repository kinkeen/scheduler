import React from "react";

import "components/InterviewerListItem.scss";
const classNames = require('classnames')

export default function DayListItem(props) {

    let interviewerClass;
    props.selected? interviewerClass = classNames(`interviewers__item--selected`) : interviewerClass = classNames(`interviewers__item`)

    return (
        <li onClick={props.setInterviewer} className={interviewerClass}>
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {props.selected && props.name}
      </li>
    );
}



