import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from './Game';
import * as nasaHook from '../hooks/useNasaImages';
import loadingStatus from '../helpers/loadingStatus';

// Mock PlayAgain component
jest.mock('./PlayAgain', () => ({onClickHandler}) => (
  <button onClick={onClickHandler}>Play Again</button>
));

// Mock LoadingIndicator
jest.mock('./LoadingIndicator', () => () => (
  <div>Loading... </div>
));

jest.mock('../helpers/randomQuery', () => () => (
  'moon'
));

const mockImageUrl = 'https://example.com/image.jpg';
const mockQuery = 'moon';

describe('Game component', () => {
  beforeEach(() => {
    jest.spyOn(nasaHook, 'default').mockImplementation(() => ({
      loadingState: loadingStatus.loaded,
      images: [
        {
          links: [{href: mockImageUrl}],
        },
      ],
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator when data is not loaded', () => {
    nasaHook.default.mockReturnValueOnce({
      loadingState: loadingStatus.loading,
      images: [],
    });

    render(<Game/>);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders game UI when data is loaded', async () => {
    render(<Game/>);
    expect(await screen.getByTestId('guessgame')).toBeInTheDocument();
    expect(screen.getByText(/Guess which one is associated/i)).toBeInTheDocument();
  });

  it('handles a correct guess', async () => {
    render(<Game/>);

    // Wait for image to load and buttons to render
    const image = await screen.findByAltText(/Space Quiz/i);
    fireEvent.load(image); // manually trigger onLoad

    const correctButton = screen.getByRole('button', {name: mockQuery});
    fireEvent.click(correctButton);

    expect(document.querySelector('.guessgamebutton').textContent).toMatch(/You're Right!/);
  });

  it('handles an incorrect guess', async () => {
    render(<Game/>);

    const image = await screen.findByAltText(/Space Quiz/i);
    fireEvent.load(image); // manually trigger onLoad

    const wrongButton = screen.getByRole('button', {name: /jupiter/i}); // pick any incorrect guess
    fireEvent.click(wrongButton);

    expect(document.querySelector('.guessgamebutton').textContent).toMatch(/Wrong, Try Again/);
  });

  it('calls incrementGameCounter on Play Again click', async () => {
    render(<Game/>);

    const image = await screen.findByAltText(/Space Quiz/i);
    fireEvent.load(image); // manually trigger onLoad

    const guessButton = await screen.findByRole('button', {name: mockQuery});
    fireEvent.click(guessButton);

    const playAgainBtn = await screen.findByText(/Play Again/i);
    fireEvent.click(playAgainBtn);

    expect(screen.getByText(/Game no. 2/i)).toBeInTheDocument();
  });
});
