import {React} from "react";
import {render, screen} from "@testing-library/react";
import Header from "../components/atoms/Header";

it("renders the header component within the application", () => {
    render(<Header />)
    expect(screen.getByText("Unlimiword")).toBeInTheDocument();
})