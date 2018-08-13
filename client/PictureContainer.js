/* eslint-disable */

import React from 'react';

let pawImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Paw-print.svg/2000px-Paw-print.svg.png';

const PictureContainer = (props) => {
	console.log('Single Picture Display Props:',props);

	return (
  		<div className="pictureBox">
        <p>{props.imageLink}</p>
        <p>{props.databaseId}</p>
        <img className="imgClass" src={props.imageLink} alt="Dog"/>
        <img className="pawImgClass" src={pawImgUrl} alt="pawPrint" onClick={
          () => {
            console.log('Clicked like on image', props.databaseId);
            props.likeButtonCb(props.databaseId);
          }
        }/>
        <p>Rank: <span style={{'fontWeight': 'normal'}}>{props.rank}</span></p>
        <p>Likes: <span style={{'fontWeight': 'normal'}}>{props.numLikes}</span></p>
        <p>Submitted by: <span style={{'fontWeight': 'normal'}}>{props.user}</span></p>
  		</div>
	);
}

export default PictureContainer;