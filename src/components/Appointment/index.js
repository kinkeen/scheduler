import React, { Fragment } from "react";
import "./styles.scss"

import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";

export default function Appointment (props) {
    let render;
    props.interview ? render = <Show student = {props.interview.student} interviewer = {props.interview.interviewer }/> : render = <Empty/>

    return (
        <Fragment>
            <Header 
                time = {props.time}
            />
            <article className="appointment">
                {render}
            </article>
        </Fragment>
    )
    
} 