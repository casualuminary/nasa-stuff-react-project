import React, { useEffect, useRef, useState } from 'react';
import useNasaImages from "../hooks/useNasaImages";
import PlayAgain from "./PlayAgain";
import loadingStatus from "../helpers/loadingStatus";
import LoadingIndicator from "./LoadingIndicator";
import spaceWords from "../helpers/spaceWords";
import randomQuery from "../helpers/randomQuery";

const GuessList = ({onGuess}) => {
  return spaceWords.map(word => (
    <div className="row justify-content-center" key={word}>
      <button
        className="btn btn-lg btn-dark btn-custom col-4 col-sm-4 col-md-2 mb-3"
        onClick={onGuess}
        id={word}
      >
        {word}
      </button>
    </div>
  ));
};

function Game(){
  const [query, setQuery] = useState(randomQuery());;
  const {images, loadingState} = useNasaImages(query);

  const [gameImage, setgameImage] = useState();
  const [gamePlayed, setgamePlayed] = useState(false);
  const gameCounter = useRef(1);
  const [score, setScore] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    if (loadingState === loadingStatus.loaded && !gamePlayed) {
      const randomIndex = Math.floor(Math.random() * images.length);
      const image = images[randomIndex]?.links?.[0]?.href;
      setgameImage(image);
      gameCounter.current++;
      setgamePlayed(true);
    }
  }, [images, loadingState, gamePlayed]);

  const resetGame = (e) => {
    setgamePlayed(false);
    setgameImage(undefined); // triggers useEffect to load a new image
    setQuery(randomQuery);
    setIsImageLoaded(false);
    setFeedbackMessage("")
  };

  const Score = () => {
    return <div className="row justify-content-end px-5">
      Score: {score} / {gameCounter.current}
    </div>
  };

  const guessChoice = (e) => {
    const guess = e.target.id;

    if (query === guess) {
      setScore(prev => prev + 1);
      setFeedbackMessage("You're Right!");
    } else {
      setFeedbackMessage("Wrong, Try Again. Correct Answer: " + query);
    }
  };
  if (loadingState === loadingStatus.loaded) {
    return (
      <div className="guessgame" data-testid="guessgame">
        <div className="row justify-content-center">Game no. {gameCounter.current}</div>
        <div className="titlegame">Guess which one is associated with this image:</div>
        {gameCounter.current > 1 ? <Score /> : null}
        <img src={gameImage} alt="Space Quiz" onLoad={() => setIsImageLoaded(true)}/>
        {isImageLoaded && (
          <div className="guessgamebutton">
            <GuessList onGuess={guessChoice}/>
            {gamePlayed ? <div className="feedback-message text-center mt-3">{feedbackMessage}</div> : null}
          </div>
        )}
        {gamePlayed &&feedbackMessage ? <PlayAgain onClickHandler={resetGame}/> : null}
      </div>
    );
  } else {
    return <LoadingIndicator loadingState={loadingState}/>
  }

}

export default Game;
