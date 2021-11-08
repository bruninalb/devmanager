import React from "react"
import  {render, screen, } from "@testing-library/react"
import App from "./index"
import Button from "../components/Button";
import DeveloperItem from "../components/DeveloperItem";
import {DeveloperProps, useDeveloper} from "../hooks/Developers";
import Filters from "../components/Filters";
import Input from "../components/Input";
import Loading from "../components/Loading";
import {useLoading} from "../hooks/Loading";
import Modal from "../components/Modal";
import EditDeveloper from "../modals/EditDeveloper";

test("Render app element", ()=> {

    const {getByText} = render(<App />)
    const TextElement = getByText(/MANAGER/i)

    expect(TextElement).toBeInTheDocument();

})
test("Render button element", () => {

    const {getByText} = render(<Button title={"Botão"} theme={"white"}/>)
    const ButtonElement = getByText(/Botão/i)
    expect(ButtonElement).toBeInTheDocument();
})
test("Render developer element", () => {

    const {getAllByText} = render(<DeveloperItem developer={{
        gender:"M",
        id:2,
        hobby:"Jogar futebol",
        birth_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        age: 30,
        name:"Bruno"
    } as DeveloperProps} />)
    const DeveloperElement = getAllByText(/Jogar futebol/i)
    DeveloperElement.map((dev) => {
        expect(dev).toBeInTheDocument();
    })
})

test("Render filters element", () => {
    const {getByText} = render(<Filters />)
    const FiltersElement = getByText(/Idade/i)
    expect(FiltersElement).toBeInTheDocument();
})

test("Render input element", () => {
    const {getByPlaceholderText} = render(<Input type={"text"} placeholder={"Test input"} />)
    const InputElement = getByPlaceholderText(/Test input/i)
    expect(InputElement).toBeInTheDocument();
})

// test("Render loading element", () => {
//
//     render(<Loading data-testid={"teste-element"} />)
//     const LoadingElement = screen.getByTestId("teste-element")
//     expect(LoadingElement).toBeInTheDocument();
// })

test("Render modal element", () => {
    const {getByText} = render(<Modal title={"Modal teste"}   />)
    const ModalElement = getByText(/Modal teste/i)
    expect(ModalElement).toBeInTheDocument();
})