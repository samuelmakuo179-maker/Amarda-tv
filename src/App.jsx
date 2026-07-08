import {useState,useEffect} from "react"
import "./App.css"
import {FaStar } from "react-icons/fa"
function Header() {
return (
<div className="Head">
<h3> AMARDA Tv</h3>
</div>
);
}

function Main() {
const [movie,setMovie]=useState([])
const [loading,setLoading]=useState(false)
const [error,setError]=useState(null)
useEffect(()=>{
async function TheMovie() {try{setLoading(true)
let res=await fetch("https://api.tvmaze.com/search/shows?q=avengers")
if(!res.ok){
throw new Error("something went wrong")}
let data=await res.json()
setMovie(data)}
catch(error) {if(error.message) 
{setError("Something went wrong")}}
finally{setLoading(false)}}
TheMovie()
},[])
if(loading) {return <p>Loading...</p>}
if(error) {return <p>{error}</p>}
 return(<div className="Body">
{movie.map((film,id)=>{
return (
<div key={film.show.id} className="The">
<img 
className="image"
src={film.show.image?.medium}
 alt={film.show.name} />
<div className="info">
<p><strong>
Name:{film.show.name}
</strong>
</p>
<p>Genres:{film.show.genres?.[0] ?? "No Genre"}</p>
<p>Ratings: <FaStar className="star"/>
{film.show.rating?.average 
?? "NO RATING"}</p>
<p>Language:{film.show.language}</p>
</div>
</div>
);
})
}
</div>);
}

function Searchmovie() {
const [movie,setMovie]=useState([])
const [error,setError]=useState(null)
const [loading,setLoading]=useState(false)
const [search,setSearch]=useState("")
async function Get() {
try{setLoading(true);
let res=await fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
if(!res.ok) {
throw new Error("something went wrong")}
let data=await res.json()
if(data.length=== 0) {setError("Movie Not Found")
setMovie([]);return}
setError(null)
setMovie(data)}
catch(error) {
setError(error.message)} 
finally{setLoading(false)}}
return (<div className="Body">
<form onSubmit={(event)=>{
event.preventDefault();Get()
}}>
<input type="text"
placeholder="Enter movie"
value={search}
onChange={(event)=>{
setSearch(event.target.value)}} />
<button type="submit">search</button></form>
{error && <p>{error}</p>}
{loading && <p>loading...</p>}
{movie.map((film,id)=>{
return(
<div key={film.show.id} className="The"> 
<p> 
<img className="image"
src={film.show.image?.medium}
alt={film.show.name} />
</p>
<p>Name: {film.show.name}</p>
<p>Genre: {film.show.genres?.[0]} </p>
<p>Rating: <FaStar className="star"/> 
{film.show.rating?.average ?? "NO RATING"}</p>
<p>Language: {film.show.language}</p>
</div>
)})
}
</div>);
}


function Ex() {
return (
<div>
<Header />
<Searchmovie />
<br />
<Main />
</div>
)
}
export default Ex
