/* eslint-disable */
// Event Creators
import * as types from './actionTypes'

export const sortImagesByRank = () => {
  console.log('Creating Event sorting by rank');
  return {
  	type: types.sortByRank,
  	payload: 'nothing'
  };
}

export const addLikeToImageInServer = (imageId) => {
  console.log('Creating Event adding like to image', imageId);


  return function (dispatch) {
  	var imageRequest = new XMLHttpRequest();
  	imageRequest.open('POST', '/like', true);
  	imageRequest.setRequestHeader('Content-Type', 'application/json');

	imageRequest.onload = function() {
      if (imageRequest.status >= 200 && imageRequest.status < 400) {
        // Success!
	    var resp = imageRequest.responseText;
	    var jsonResp = JSON.parse(resp);
	    console.log('Successful GET Request');
	    dispatch({
	      type: types.likeImage,
	      payload: {jsonResp: jsonResp, imageId: imageId}
	    });
	  } else {
	    // We reached our target server, but it returned an error
	  }
  	};

    imageRequest.onerror = function() {
      // There was a connection error of some sort
      console.log('Connection Error')
    };

    // imageRequest.send(imageUrlText);
    imageRequest.send(JSON.stringify({ imageId: imageId }));
  };	
}

export const submitImageToServer = (imageUrlText, imageInitRank) => {
  console.log('Creating Event adding image to server', imageUrlText, 'and rank', imageInitRank);


  return function (dispatch) {
  	var imageRequest = new XMLHttpRequest();
  	imageRequest.open('POST', '/images', true);
  	imageRequest.setRequestHeader('Content-Type', 'application/json');

	imageRequest.onload = function() {
      if (imageRequest.status >= 200 && imageRequest.status < 400) {
        // Success!
	    var resp = imageRequest.responseText;
	    var jsonResp = JSON.parse(resp);
	    console.log('Successful GET Request');
	    dispatch({
	      type: types.submitImage,
	      payload: jsonResp
	    });
	  } else {
	    // We reached our target server, but it returned an error
	  }
  	};

    imageRequest.onerror = function() {
      // There was a connection error of some sort
      console.log('Connection Error')
    };

    // imageRequest.send(imageUrlText);
    imageRequest.send(JSON.stringify({ imageUrl: imageUrlText, imageRank: imageInitRank}));
  };	
}

export const getInitImagesFromServer = () => {
  console.log('Creating Event for getting all images');


  return function (dispatch) {
  	var imageRequest = new XMLHttpRequest();
  	imageRequest.open('GET', '/images', true);

	imageRequest.onload = function() {
      if (imageRequest.status >= 200 && imageRequest.status < 400) {
        // Success!
	    var resp = imageRequest.responseText;
	    var jsonResp = JSON.parse(resp);
	    console.log('Successful GET Request');
	    dispatch({
	      type: types.getInitImages,
	      payload: jsonResp
	    });
	  } else {
	    // We reached our target server, but it returned an error
	  }
  	};

    imageRequest.onerror = function() {
      // There was a connection error of some sort
      console.log('Connection Error')
    };

    imageRequest.send();
  };
}

export const createNewUser = (username, password) => {
  console.log('Creating Event for creating a new user');

  return function (dispatch) {
  	var imageRequest = new XMLHttpRequest();
  	imageRequest.open('POST', '/signUp', true);
  	imageRequest.setRequestHeader('Content-Type', 'application/json');

	imageRequest.onload = function() {
      if (imageRequest.status >= 200 && imageRequest.status < 400) {
        // Success!
	    var resp = imageRequest.responseText;
	    var jsonResp = JSON.parse(resp);
	    console.log('Successful GET Request');
	    dispatch({
	      type: types.userSignUp,
	      payload: jsonResp
	    });
	  } else {
	    // We reached our target server, but it returned an error
	  }
  	};

    imageRequest.onerror = function() {
      // There was a connection error of some sort
      console.log('Connection Error')
    };

    imageRequest.send(JSON.stringify({ username: username, password: password}));
  };
}

export const userLogin = (username, password) => {
  console.log('Creating Event for signing in a user');

  return function (dispatch) {
  	var imageRequest = new XMLHttpRequest();
  	imageRequest.open('POST', '/userLogin', true);
  	imageRequest.setRequestHeader('Content-Type', 'application/json');

	imageRequest.onload = function() {
      if (imageRequest.status >= 200 && imageRequest.status < 400) {
        // Success!
	    var resp = imageRequest.responseText;
	    var jsonResp = JSON.parse(resp);
	    console.log('Successful GET Request');
	    dispatch({
	      type: types.userLogin,
	      payload: jsonResp
	    });
	  } else {
	    // We reached our target server, but it returned an error
	  }
  	};

    imageRequest.onerror = function() {
      // There was a connection error of some sort
      console.log('Connection Error')
    };

    imageRequest.send(JSON.stringify({ username: username, password: password}));
  };
}