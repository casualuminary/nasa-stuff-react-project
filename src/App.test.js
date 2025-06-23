import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import React from "react";

// Mock child components to simplify routing test
// jest.mock('./components/Header', () => () => <div data-testid="header">Header</div>);
// jest.mock('./components/SearchForm', () => () => <div data-testid="search-form">SearchForm</div>);
// jest.mock('./components/Game', () => () => <div data-testid="game">Game</div>);

describe('App routing', () => {
  it('redirects / to /search and renders SearchForm', () => {
    render(<App />);

    expect(screen.getByTestId('banner')).toBeInTheDocument();
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(document.querySelector('h4').textContent).toMatch(/Enter a Celestial Term:/);
  });

  it('renders SearchForm at /search', () => {
    render(<App />);

    expect(screen.getByTestId('banner')).toBeInTheDocument();
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });

  it('renders Game at /game', () => {
    render(<App />);
    const playButton = screen.getByRole('button', {name: 'Play !'});
    fireEvent.click(playButton);

    expect(screen.getByTestId('banner')).toBeInTheDocument();
    expect(document.querySelector('h3').textContent).toMatch(/Loading/);
  });
});
