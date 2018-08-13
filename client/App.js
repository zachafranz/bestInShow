/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

// import topThree from './topThreeContainer.js';
import AllPicturesComponent from './allPicturesContainer.js';


const mapStateToProps = store => {
  // add pertinent state here - needs everything?
  console.log('Main Container Store: ', store);
  return store;
  // return { 
  //   totalCards: store.markets.totalCards,
  //   totalMarkets: store.markets.totalMarkets
  // };
};

const mapDispatchToProps = dispatch => {
  console.log('Binding Action Creators', actions);
  return bindActionCreators({
    submitImageToServer: actions.submitImageToServer,
    getInitImagesFromServer: actions.getInitImagesFromServer,
    addLikeToImage: actions.addLikeToImageInServer,
    sortImagesByRank: actions.sortImagesByRank,
    createNewUser: actions.createNewUser,
    userLogin: actions.userLogin
  }, dispatch);
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('App Component Mounted.');
    this.props.getInitImagesFromServer();
  }

  render() {
    console.log('App Props Are', this.props);
    return(
      <div>
        <h1>Best In Show</h1>
        <input type="text" name="username" id="usernameInput" defaultValue="Username"/>
        <input type="text" name="password" id="passwordInput" defaultValue="Passowrd"/>
        <button onClick={() => {
          let usernameText = document.getElementById('usernameInput').value;
          let passwordText = document.getElementById('passwordInput').value;
          console.log('Clicked Login Button:', usernameText, passwordText);
          this.props.userLogin(usernameText, passwordText);
        } }>Login</button>
        <button onClick={() => {
          let usernameText = document.getElementById('usernameInput').value;
          let passwordText = document.getElementById('passwordInput').value;
          console.log('Clicked Sign Up Button:', usernameText, passwordText);
          this.props.createNewUser(usernameText, passwordText);
        } }>Sign Up</button>
        <br/>
        <input type="text" name="imageUrl" id="imageUrlInput" defaultValue="Image URL"/>
        <button onClick={() => {
          let imageUrlText = document.getElementById('imageUrlInput').value;
          console.log('Clicked Submit Button:', imageUrlText);
          this.props.submitImageToServer(imageUrlText, this.props.numPictures);
        } }>Submit</button>
        <button onClick={() => {
          console.log('Clicked Rank Order Button');
          this.props.sortImagesByRank();
        } }>Order by Rank</button>
        <button onClick={() => {
          console.log('Clicked Rank By Date Button');
          this.props.submitImageToServer(imageUrlText, this.props.numPictures);
        } }>Order by Time</button>
        <AllPicturesComponent allPictures={this.props.allPictures} likeButtonCb={this.props.addLikeToImage}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);