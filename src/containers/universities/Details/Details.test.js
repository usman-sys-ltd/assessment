import React from "react";
import { render, waitFor } from "@testing-library/react";
import Details from "./Details";
import { ListingsContext } from "../../../contexts/ListingsContext";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: "Univeristy 1"
    })
}));

const mockListingsContextValue = {
    fetchUniversities: jest.fn(),
    universities: {
        entities: {
            "Univeristy 1": {
                alpha_two_code: "SA",
                name: "University 1",
                country: "Country 1",
                domains: ["domain1.com", "domain2.com"],
                web_pages: ["webpage1.com", "webpage2.com"],
                "state-province": "State 1"
            }
        },
    },
    userInterface: { universitiesFetched: true },
};

describe("Details component", () => {
    it("displays university details when universities are fetched", async () => {
        const { getByText } = render(<ListingsContext.Provider value={mockListingsContextValue}><Details /></ListingsContext.Provider>);

        await waitFor(() => {
            expect(getByText("University Details")).toBeInTheDocument();
            expect(getByText("University 1")).toBeInTheDocument();
            expect(getByText("SA")).toBeInTheDocument();
            expect(getByText("Country 1")).toBeInTheDocument();
            expect(getByText("domain1.com domain2.com")).toBeInTheDocument();
            expect(getByText("webpage1.com webpage2.com")).toBeInTheDocument();
            expect(getByText("State 1")).toBeInTheDocument();
        });
    });

    it("displays loading message while fetching universities", () => {
        const { getByTestId } = render(
            <ListingsContext.Provider value={{...mockListingsContextValue, userInterface: {universitiesFetched: false}}}>
                <Details />
            </ListingsContext.Provider>
        );

        expect(getByTestId('loader')).toBeInTheDocument();
    });
});