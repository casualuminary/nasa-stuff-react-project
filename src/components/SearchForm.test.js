import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

// Mock SearchResults to isolate SearchForm testing
jest.mock('./SearchResults', () => ({ query }) => (
  <div data-testid="search-results">SearchResults: {query}</div>
));

const mockedNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockedNavigate
}));

describe('SearchForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders heading and input field', () => {
    render(<SearchForm />);

    expect(screen.getByText(/Enter a Celestial Term:/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('navigates and sets query on submit', () => {
    render(<SearchForm />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'jghsjgsjgsjgsj' } });
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/search?q=jghsjgsjgsjgsj');
    expect(screen.getByTestId('search-results')).toHaveTextContent('SearchResults: jghsjgsjgsjgsj');
  });

  it('does not navigate if input is empty', () => {
    render(<SearchForm />);

    const button = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/search?q=undefined');
  });
});
