/* eslint-disable */

import * as types from './actionTypes';

const initialState = {
  //Make call to database
  topThree: [],
  allPictures: [],
  numPictures: 0
};

const copyStateArr = (arr) => {
  return arr.map((elem) => {return Object.assign({}, elem)});
}

const imageReducers = (state=initialState, action) => {
  console.log('State is:',state);
  console.log ('Action is:', action);
  let allPictures;
  let numPictures;

  switch(action.type) {
    case types.submitImage:
      console.log('In Submit Image with', action.payload);
      // return updated state
      allPictures = copyStateArr(state.allPictures);
      allPictures.push(action.payload);
      numPictures = state.numPictures + 1;

      return {
        ...state,
        allPictures,
        numPictures
      };

    case types.getInitImages:
      console.log('In get Initial Images with', action.payload);
      allPictures = action.payload;
      numPictures = allPictures.length;

      return {
        ...state,
        allPictures,
        numPictures
      };

    case types.likeImage:
      console.log('In Reducer Like Image with', action.payload);

      // action.payload.jsonResp.find((elem) => )

      // allPictures = state.allPictures.map((elem) => {
      //   if (elem._id === action.payload.imageId._id) {
      //     console.log('Found liked image and adding like!')
      //     let copyObj = Object.assign({}, elem);
      //     copyObj.numLikes += 1;
      //     return copyObj;
      //   }
      //   else return Object.assign({}, elem);
      // })
      allPictures = action.payload.jsonResp;

      return {
        ...state,
        allPictures
      };

    case types.sortByRank:
      console.log('In Reducer Sort By Rank', action.payload);
      allPictures = Array(state.allPictures.length);
      state.allPictures.forEach((elem) => {
        allPictures[elem.rank] = Object.assign({}, elem);
      });

      return {
        ...state,
        allPictures
      };

    case types.userLogin:
      console.log('In Reducer user Login', action.payload);

      return {
        ...state,
      };

    case types.userSignUp:
      console.log('In Reducer user Login', action.payload);

      return {
        ...state,
      };

    default:
      return state;
  }
};

export default imageReducers;