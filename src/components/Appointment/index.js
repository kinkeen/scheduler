import React, { Fragment } from "react";
import "./styles.scss"
import  useVisualMode  from "../../hooks/useVisualMode";

import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";
import Form from "./Form";
import Status from "./Status";
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment (props) {
    
    const {mode, transition, back} = useVisualMode (props.interview ? SHOW : EMPTY)

    const save = (name, interviewer) =>  {
        const interview = {
            student: name,
            interviewer
        };

        transition(SAVING)

        props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
    }

    const del = () => {
        transition(DELETE,true)
        props
        .cancelInterview(props.id)
        .then(() => transition(EMPTY))
    }

    const confirm = () => {
        transition(CONFIRM)
    }
        
    return (
        <Fragment>
            <Header 
                time = {props.time}
            />
            <article className="appointment">
                {mode === CONFIRM && (
                    <Confirm
                        message = {"Delete the appointment?"}
                        onConfirm = {del}
                        onCancel = {back}
                    />
                )}
                {mode === SAVING && <Status message = {"Saving"} />}
                {mode === DELETE && <Status message = {"Deleting"} />}                
                {mode === EMPTY && <Empty onAdd = {() => transition(CREATE)} />}
                {mode === SHOW && (
                    <Show
                        student = {props.interview.student}
                        interviewer = {props.interview.interviewer}
                        onDelete = {confirm}
                    />
                )}
                {mode === CREATE && (
                    <Form 
                        interviewers = {props.interviewers}
                        onCancel = {() => back()}
                        onSave = {save}
                    />
                )}
            </article>
        </Fragment>
    )
    
} 