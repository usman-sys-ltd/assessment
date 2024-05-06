import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Listings from './Listings';
import { ListingsContext } from "../../../contexts/ListingsContext";
import { BrowserRouter } from 'react-router-dom';

const mockFetchUniversities = jest.fn();

const mockListingsContextValue = {
    fetchUniversities: mockFetchUniversities,
    universities: {
        entities: {
            'University 2': { name: 'University 2', country: 'Country 2' },
            'University 1': { name: 'University 1', country: 'Country 1', 'state-province': 'State 1' },
        },
    },
    updateUniversities: jest.fn(),
    userInterface: { universitiesFetching: false, universitiesFetched: true, universitiesFailed: false, universitiesError: null },
};

const ListComponent = () => (
    <BrowserRouter>
        <ListingsContext.Provider value={mockListingsContextValue}>
            <Listings />
        </ListingsContext.Provider>
    </BrowserRouter>
);

describe('Listings component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders component correctly', async () => {
        const { getByText, getByPlaceholderText } = render(<ListComponent />);

        expect(mockFetchUniversities).toHaveBeenCalledTimes(1);
        expect(getByPlaceholderText('Search by name')).toBeInTheDocument();
        expect(getByText('University 1')).toBeInTheDocument();
    });

    it('handles search input correctly', async () => {
        const { getByPlaceholderText, getByText } = render(<ListComponent />);

        const searchInput = getByPlaceholderText('Search by name');
        fireEvent.change(searchInput, { target: { value: 'University' } });

        await waitFor(() => {
            expect(getByText('University 1')).toBeInTheDocument();
            expect(getByText('University 2')).toBeInTheDocument();
        });
    });

    it('handles sort toggle correctly', async () => {
        const { getByLabelText, getByText } = render(<ListComponent />);

        const sortToggle = getByLabelText('Sorting');
        fireEvent.click(sortToggle);

        await waitFor(() => {
            expect(getByText('University 1')).toBeInTheDocument();
            expect(getByText('University 2')).toBeInTheDocument();
        });
    });

    it('handles state toggle correctly', async () => {
        const { getByLabelText, getByText } = render(<ListComponent />);

        const stateToggle = getByLabelText('State');
        fireEvent.click(stateToggle);

        await waitFor(() => {
            expect(getByText('University 1')).toBeInTheDocument();
            expect(getByText('Country 1')).toBeInTheDocument();
        });
    });
});