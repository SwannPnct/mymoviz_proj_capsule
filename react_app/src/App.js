import React, {useState,useEffect} from 'react';
import './App.css';
import Movie from './modules/Movie';
import Header from './modules/Header';

function App() {

  const [movieCount, setMovieCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [movies, setMovies] = useState([])

  const appStyle = {
    backgroundColor: "black"
  }

  useEffect(() => {
    async function getPopMovies() {
      const rawMovies = await fetch('/new-movies');
      const jsonMovies = await rawMovies.json();
      const result = jsonMovies.results;

      const rawUpdate = await fetch('/movie-wishlist');
      const jsonUpdate = await rawUpdate.json();
      const wishlistUpdate = jsonUpdate.wishlist;
      setWishlist(wishlistUpdate);

      const array = [];
      for (let i=0; i< result.length;i++) {
        array.push({
          name: result[i].title,
          desc: result[i].overview.slice(0,80) + "...",
          img: result[i].backdrop_path? "https://image.tmdb.org/t/p/w200"+result[i].backdrop_path : "/img/generique.jpg",
          vote: result[i].vote_count,
          note: result[i].vote_average,
          wished : wishlistUpdate.find(e => e.name === result[i].title) ? true : false
        })
      }
      setMovies(array);
    }
    getPopMovies();
    countHelper();
  },[])

  useEffect(() => {
    countHelper();
  }, [wishlist])

  async function countHelper() {
    const wishlistData = await fetch('/movie-wishlist');
    const jsonData = await wishlistData.json();
    const jsonWishlist = jsonData.wishlist;

    setMovieCount(jsonWishlist.length);
  }

  async function handleClickAddMovie(bool,name,src) {
    if (bool) {
      await fetch('/movie-wishlist', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: "name="+name+"&img="+src
      });      
      const rawUpdate = await fetch('/movie-wishlist');
      const jsonUpdate = await rawUpdate.json();
      const wishlistUpdate = jsonUpdate.wishlist;
      setWishlist(wishlistUpdate);

      const shallowCopy = [...movies];
      const index = shallowCopy.findIndex(e => e.name === name);
      shallowCopy[index].wished = true;
      setMovies(shallowCopy);
    } else {
        await fetch('/movie-delete/'+name, {
          method: 'DELETE'
        })

        const rawUpdate = await fetch('/movie-wishlist');
        const jsonUpdate = await rawUpdate.json();
        const wishlistUpdate = jsonUpdate.wishlist;
        setWishlist(wishlistUpdate);

        const shallowCopy = [...movies];
        const index = shallowCopy.findIndex(e => e.name === name);
        shallowCopy[index].wished = false;
        setMovies(shallowCopy);
      
    }
  }

  const genMovie = function() {
    return movies.map((mov) => {
        return(
          <Movie src={mov.img} vote={mov.vote} note={mov.note} name={mov.name} desc={mov.desc} handleAddMovie={handleClickAddMovie} wished={mov.wished}/>
        )
    })
  }

  return (
    <div style={appStyle}>
      <Header count={movieCount} wishlist={wishlist} handleDeleteMovie={handleClickAddMovie}/>
      <div className="container">
        <div className="row">
          {genMovie()}
        </div>
      </div>
    </div>
  
  );
}

export default App;
