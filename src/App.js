import React, {  useState, useMemo } from 'react';
import './App.css';



const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);




 

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=c8e50477&s=${searchTerm}&p=[]`
    );
    const data = await res.json();
    setMovies(data.Search || []);
    setLoading(false);
  };


  const resSearch= useMemo(() => {
    return movies.filter((movi) => {
      return movi.Title.toUpperCase().includes(searchTerm.toUpperCase());
    });
  }, [searchTerm, movies]);



  const movieAdd = (movie) => {
    setFavorites([...favorites, movie]);
  };



  const removeMovie = (idx) => {
    let tempFav = [...favorites];
    tempFav.splice(idx, 1);
    setFavorites([...tempFav]);
  };


  return (
    <div className='container'>
      <input 
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button
      className='dugme'
      onClick={handleSearch}
      >Search
      </button>
      <hr />
      

      
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <ul>
          {resSearch.map((movi, idx) => {
            return <li className='text-white' key={idx}>{movi.Title}
            <button className='dugme bg-primary' onClick={() => movieAdd(movi)}>Add</button></li>;
          })}
          
        </ul>
      )}


    
      <h2 className='mt-5 text-white'>Favorites:</h2>
      <ul>
        {favorites.map((fav, idx) => (
          <li className='text-white' key={idx}>{fav.Title}
          <button className='dugme bg-danger' onClick={() => removeMovie([])}>Remove</button>
          </li>
          
        ))}
      </ul>



    </div>
  );
}

export default App;

