import React, { useEffect, useRef, useState } from 'react';
import useNasaImages from "../hooks/useNasaImages";
import PlayAgain from "./PlayAgain";
import loadingStatus from "../helpers/loadingStatus";
import LoadingIndicator from "./LoadingIndicator";

const spaceWords = ["moon", "earth", "jupiter", "saturn", "pluto", "mars", "venus"];

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

const getRandomQuery = () => {
  return spaceWords[Math.floor(Math.random() * spaceWords.length)];
};

function Game(){
  const [query, setQuery] = useState(getRandomQuery());;
  const {images, loadingState} = useNasaImages(query);

  const [gameImage, setgameImage] = useState();
  const [gameAnswer, setgameAnswer] = useState(query);
  const [gamePlayed, setgamePlayed] = useState(false);
  const gameCounter = useRef(1);
  const [score, setScore] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (loadingState === loadingStatus.loaded) {
      const randomIndex = Math.floor(Math.random() * images.length);
      const image = images[randomIndex]?.links?.[0]?.href;
      setgameImage(image);
      setgameAnswer(query);
    }
  }, [images, gameCounter.current]);

  const incrementGameCounter = (e) => {
    gameCounter.current++; // triggers useEffect to load a new image
    setQuery(getRandomQuery);
    setIsImageLoaded(false);
    setgamePlayed(false);
  };

  const Score = () => {
    return <div className="row justify-content-end px-5">
      Score: {score} / {gameCounter.current - 1}
    </div>
  };

  const guessChoice = (e) => {
    const guess = e.target.id;

    if (gameAnswer === guess) {
      setScore(prev => prev + 1);
      document.querySelector(".namegamebutton").innerHTML = "You're Right!";
    } else {
      document.querySelector(".namegamebutton").innerHTML =
        "Wrong, Try Again. Correct Answer: " + gameAnswer;
    }
    setgamePlayed(true);
  };
  if (loadingState == loadingStatus.loaded) {
    return (
      <div className="namegame">
        <div className="row justify-content-center">Game no. {gameCounter.current}</div>
        <div className="titlegame">Guess which one is associated with this image:</div>
        {gameCounter.current > 1 ? <Score /> : null}
        <img src={gameImage} id="namegameimage" alt="Game image" onLoad={() => setIsImageLoaded(true)}/>
        {isImageLoaded && (
          <div className="namegamebutton">
            <GuessList onGuess={guessChoice}/>
          </div>
        )}
        {gamePlayed ? <PlayAgain onClickHandler={incrementGameCounter}/> : null}
      </div>
    );
  } else {
    return <LoadingIndicator loadingState={loadingState}/>
  }

}

export default Game;
