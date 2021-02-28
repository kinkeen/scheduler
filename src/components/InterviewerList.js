import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

    //console.log(props)

    const interviewersData = props.interviewers.map((interviewer) => {
        return (
            <InterviewerListItem
                key={interviewer.id}
                name={interviewer.name}
                avatar={interviewer.avatar}
                selected={interviewer.id === props.id}
                setInterviewer={() => props.onChange(interviewer)}
            />
        )
    })

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {interviewersData}
            </ul>
        </section>
    )
}

InterviewerList.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired
};
