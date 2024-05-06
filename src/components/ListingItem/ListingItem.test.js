import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListingItem from './ListingItem';
import { BrowserRouter } from 'react-router-dom';

describe('ListingItem component', () => {
    it('renders component correctly', () => {
        const data = { name: 'Al Ghurair University', country: 'United Arab Emirates' };
        const deleteItem = jest.fn();

        const { getByText, getByTestId } = render(
            <BrowserRouter>
                <table>
                    <tbody>
                        <ListingItem data={data} deleteItem={deleteItem} />
                    </tbody>
                </table>
            </BrowserRouter>

        );

        expect(getByText('Al Ghurair University')).toBeInTheDocument();
        expect(getByText('United Arab Emirates')).toBeInTheDocument();
        expect(getByTestId('detail-btn')).toBeInTheDocument();
        expect(getByTestId('delete-btn')).toBeInTheDocument();
    });

    it('calls deleteItem function when delete button is clicked', () => {
        const data = { name: 'Al Ghurair University', country: 'United Arab Emirates' };
        const deleteItem = jest.fn();

        const { getByTestId } = render(
            <BrowserRouter>
                <table>
                    <tbody>
                        <ListingItem data={data} deleteItem={deleteItem} />
                    </tbody>
                </table>
            </BrowserRouter>
        );

        const deleteButton = getByTestId('delete-btn');
        fireEvent.click(deleteButton);

        expect(deleteItem).toHaveBeenCalledTimes(1);
        expect(deleteItem).toHaveBeenCalledWith('Al Ghurair University');
    });
});