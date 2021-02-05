import React, {useState} from 'react';
import {
  Card, CardImg, CardText, CardBody, Badge, ButtonGroup, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faVideo, faHeart, faStar} from '@fortawesome/free-solid-svg-icons';

const Movie = (props) => {
  const [watchMovie, setWatchMovie] = useState(false);
  const [countWatchMovie, setCountWatchMovie] = useState(0);
  const [myRatingMovie, setMyRatingMovie] = useState(5);

  const [totalVote, setTotalVote] = useState(props.vote);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCounted, setVoteCounted] = useState(false);
  const [moy, setMoy] = useState(props.note);

  const movieStyle = {
    marginBottom: "20px"
  }

  let likeStyle;
  if (props.wished) {
    likeStyle = {
      color: "#e74c3c"
    }
  }
  let watchStyle;
  if (watchMovie) {
    watchStyle = {
      color: "#e74c3c"
    }
  }


  const genPerso = function() {
    const yellowStyle = {
      color: "#f1c40f"
    }
    const icons = [];
    for (let i=0; i< myRatingMovie; i++) {
        icons.push(<FontAwesomeIcon icon={faStar} style={yellowStyle} onClick={() => handleVoteShortcut(i+1)}/>)
    }
    for (let j=0; j < (10-myRatingMovie); j++) {
      icons.push(<FontAwesomeIcon icon={faStar} onClick={() => handleVoteShortcut(myRatingMovie+j+1)}/>)
    }
    return icons;
  }

  const genVote = function() {
    if (hasVoted) {
        setMoy(Math.round(((props.note * props.vote)+myRatingMovie)/(props.vote+1)));
        setHasVoted(false);
        if(!voteCounted) {
          setTotalVote(totalVote + 1);
          setVoteCounted(true);
        }
        
    }
    
    const yellowStyle = {
      color: "#f1c40f"
    }
    const icons = [];
    for (let i=0; i< moy; i++) {
        icons.push(<FontAwesomeIcon icon={faStar} style={yellowStyle}/>)
    }
    for (let j=0; j < (10-moy); j++) {
      icons.push(<FontAwesomeIcon icon={faStar}/>)
    }
    return icons;
  }

  function handleLikeClick() {
    props.handleAddMovie(!props.wished,props.name,props.src);
  }

  function handleWatchClick() {
    setWatchMovie(true);
    setCountWatchMovie(countWatchMovie + 1);
  }

  function handlePlusOne() {
    if(myRatingMovie < 10) {
      setMyRatingMovie(myRatingMovie + 1);
      setHasVoted(true);
    }
  }
  function handleMinusOne() {
    if(myRatingMovie > 0) {
      setMyRatingMovie(myRatingMovie - 1);
      setHasVoted(true);
    }
  }

  function handleVoteShortcut(vote) {
    setMyRatingMovie(vote);
    setHasVoted(true);
  }


  return (
    <div className="col-12 col-lg-6 col-xl-4" style={movieStyle}>
      <Card>
        <CardImg top width="100%" src={props.src} alt="movie image"/>
        <CardBody>
          <CardText>Like <FontAwesomeIcon icon={faHeart} className="heart_icon" style={likeStyle} onClick={() => handleLikeClick()}/></CardText>
          <CardText>Nombre de vues &nbsp;<FontAwesomeIcon icon={faVideo} className="watch_icon" style={watchStyle} onClick={() => handleWatchClick()}/>&nbsp;<Badge pill>{countWatchMovie}</Badge></CardText>
          <CardText>Perso {genPerso()}
            <ButtonGroup><Button onClick={() => handleMinusOne()}>-</Button><Button onClick={() => handlePlusOne()}>+</Button></ButtonGroup></CardText>
          <CardText>Global {genVote()} ({totalVote})</CardText>
          <CardText>{props.name}</CardText>
          <CardText>{props.desc}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Movie;