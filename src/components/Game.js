import React, { Component } from 'react';

import PlayAgain from './PlayAgain'

export default class Game extends Component {

//state tracks the current image from the api, the item trhe player guessed, attempts played, and whether the game has been played once
  state = {
    images: [],
    image: "",
    item: "",
    gamePlayed: false,
    gameCount: 0
  }

  //ajax request to get the image for the game
  getGameImage = async (randomSearchItem) => {
    try {
      const spaceSearch = ["moon", "earth", "jupiter", "saturn", "pluto", "mars", "venus"]
      const url = "https://images-api.nasa.gov/search?q=";
      let randomSearchItem = spaceSearch[Math.floor(Math.random()*spaceSearch.length)];
      const response = await fetch(url + randomSearchItem);
      const json = await response.json();
      let oneHundred = [];
      for (let i = 0; i <= 100; i++) {
        oneHundred.push(i);
      }

      let randomNumber = oneHundred[Math.floor(Math.random()*oneHundred.length)]
      const imageres = json.collection.items[randomNumber].links[0].href;

      this.setState({
        image: imageres,
        item: randomSearchItem
      });
    } catch (error) {
      console.error("Error fetching data from NASA API:", error);
    }
  }

//the game choices are rendered
  playGame = () => {
    const spaceWords = ["moon", "earth", "jupiter", "saturn", "pluto", "mars", "venus"]
      return spaceWords.map(word =>
        <div className="guessing">
          <button onClick={ e => this.guessChoice(e)} id={word}>{word}</button>
        </div>
      )
  }

//the player chooses one item and this function determines if it's a win
  guessChoice = (e) => {

    this.setState({
      gamePlayed: true,
      guess: e.target.id
    })

    if (this.state.item === e.target.id) {
      document.querySelector(".namegamebutton").innerHTML = "You're Right!";
    } else {
      document.querySelector(".namegamebutton").innerHTML = "Wrong, Try Again. Correct Answer: " + this.state.item;
    }

  }

  playAgain = () => {
    this.setState({
      gamePlayed: false
    })
  }

  renderGame = () => {
    return <div className="namegamebutton">{this.playGame()}</div>
  }


//ajax request after the component mounts
  componentDidMount(){
    this.getGameImage()
    this.setState({gameCount: this.state.gameCount++})
  }


//Renders the game image, the choices, and determines if the game is done and can be played again
  render() {

    return (

      <div className="namegame" >

        <div className="titlegame">Guess which one is associated with this image:</div>
        <img src={this.state.image} id="namegameimage" />
        {this.renderGame()}
        {this.state.gamePlayed ? <PlayAgain /> : null}

      </div>
    );
  }
}
