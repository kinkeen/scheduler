import React from "react";

import "components/InterviewerListItem.scss";
const classNames = require('classnames')

export default function InterviewerListItem({ name, avatar, selected, setInterviewer} ) {

  //const { name, avatar, selected, setInterviewer } = props

  let interviewerClass;

  selected ? interviewerClass = classNames(`interviewers__item--selected`) : interviewerClass = classNames(`interviewers__item`)

  return (
    <li onClick={setInterviewer} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}



