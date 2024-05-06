import React from 'react';
import { render } from '@testing-library/react';
import ItemDetails from './ItemDetails';

describe('ItemDetails component', () => {
    it('renders component correctly', () => {
        const data = { title: 'Name', description: 'University 1' };

        const { getByText } = render(
            <ItemDetails {...data} />
        );

        expect(getByText('Name')).toBeInTheDocument();
        expect(getByText('University 1')).toBeInTheDocument();
    });
});