import React from "react";
import axios from "axios";

import { fireEvent } from "@testing-library/react";

import { render, cleanup } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
    const data = {
        interviewers: [
            { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
            { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
            { id: 7, name: "Alec Quon", avatar: "https://i.imgur.com/3tVgsra.jpg" },
            { id: 8, name: "Viktor Jain", avatar: "https://i.imgur.com/iHq8K8Z.jpg" },
            { id: 10, name: "Samantha Stanic", avatar: "https://i.imgur.com/okB9WKC.jpg" }
        ],
        interviewer: {
            avatar: "https://i.imgur.com/LpaY82x.png",
            id: 1,
            name: "Sylvia Palmer"
        },
        name: "Archie Cohen",
        onSave: (name, interviewer) => {
            return name;
        },
        onCancel: () => {
            console.log('onSave')
        }
    }

    it("renders without student name if not provided", () => {
        const { getByPlaceholderText } = render(
            <Form {...data} name="" />
        );

        expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    });

    it("renders with initial student name", () => {
        const { getByTestId } = render(
            <Form {...data} name="Lydia Miller-Jones" />
        );

        expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
    });

    it("validates that the student name is not blank", () => {
        const onSave = jest.fn();
        const { getByText } = render(
            <Form {...data} name="" onSave={onSave} />
        );

        fireEvent.click(getByText("Save"));

        expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
        expect(onSave).not.toHaveBeenCalled();
    });
});