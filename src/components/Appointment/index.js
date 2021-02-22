import React, { Fragment } from "react";
import "./styles.scss"
import  useVisualMode  from "../../hooks/useVisualMode";

import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


export default function Appointment (props) {
    
    const {mode, transition, back} = useVisualMode (props.interview ? SHOW : EMPTY)

    const save = (name, interviewer) => {
        const interview = {
            student:name,
            interviewer
        }

        transition(SAVING)
        props.bookInterview(props.id, interview)

        transition(SHOW)
    }

    return (
        <Fragment>
            <Header 
                time = {props.time}
            />
            <article className="appointment">
                {mode === SAVING && <Status message={"Saving"} />}
                {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
                {mode === SHOW && (
                    <Show
                        student={props.interview.student}
                        interviewer={props.interview.interviewer}
                    />
                )}
                {mode === CREATE && (
                    <Form 
                        interviewers={props.interviewers}
                        onCancel={() => back()}
                        onSave={save}
                    />
                )}
            </article>
        </Fragment>
    )
    
} 