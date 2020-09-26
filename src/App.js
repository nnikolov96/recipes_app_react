import React, { useState } from 'react';
import Axios from 'axios';
import Recipe from './components/Recipe';
import Alert from './components/Alert';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');
  const app_id = '3938b7d5';
  const app_key = '081e17d704691a81bb7fe065a6777824'
  const url = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`

  const getData = async () => {
    if( query !== ''){
      const result = await Axios.get(url);
      if(!result.data.more) { 
        return setAlert('No recipes found');
      }
      setAlert('');
      setRecipes(result.data.hits);
      setQuery('');
    }
    else { 
      setAlert('Please fill the form');
    }

  }

  const onSubmit = (e) => { 
    e.preventDefault();
    getData();
  }
  const onChange = e => { 
    setQuery(e.target.value);
  }

  return (
    <div className='App'>
      <h1>Food searching App</h1>
      <form className='search-form' onSubmit={onSubmit}>
        { alert !== '' && <Alert alert = {alert}/> }
        <input type='text' placeholder='Search Food' autoComplete='off' onChange = { onChange } value= {query} />
        <input type='submit' value='search'/>
      </form>
      <div className='recipes'>
        {recipes !== [] && recipes.map( recipe => 
          <Recipe key={uuidv4()} recipe={recipe} />
        )}
      </div>
    </div>
  )
}

export default App
