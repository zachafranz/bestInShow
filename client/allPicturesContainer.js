/* eslint-disable */

import React from 'react';
import PictureContainer from './PictureContainer.js';


const AllPicturesContainer = (props) => {
  console.log('All Pictures Container:',props);
  // let allMarketDivs = [];
  // for (let i = 0; i < props.allPictures.length; i += 1) {
  // 	allMarketDivs.push(<MarketDisplay marketObj={props.allMarkets[i]} addCardCb={props.addCardCb} 
  // 		deleteCardCb={props.deleteCardCb} key={'marketDiv' + i} totalCards={props.totalCards}/>)
  // }
  let allPictureDivs = props.allPictures.map((elem, ind) => {
  	return <PictureContainer 
  		imageLink={elem.imageLink}
  		rank={elem.rank}
		numLikes={elem.numLikes} 
		user={elem.user}
		databaseId={elem._id}
		key={'allPicCont' + ind}
		likeButtonCb={props.likeButtonCb} />
  })
  // key={'marketDiv' + i}

  return (
  	<div>
  	  {allPictureDivs}
    </div>
  );
}

export default AllPicturesContainer;
