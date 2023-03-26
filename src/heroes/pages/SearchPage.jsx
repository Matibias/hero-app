/* eslint-disable react/react-in-jsx-scope */
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string'

import { useForm } from "../../hook/useForm";
import { HeroCard } from "../components";
import { getHeroByName } from "../helpers";

export const SearchPage = () => {

  const navigate = useNavigate() // para obtener la navegacion
  const location = useLocation(); // para obtener la localizacion de donde estamos (query)

  const {q = ''} = queryString.parse(location.search) // queryString para parsear la query
  const heroes = getHeroByName(q)

  const showSearch = (q.length === 0)
  const showError = (q.length > 0) && (heroes.length === 0)

  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    // if (searchText.trim() <=1) return;

    navigate(`?q=${ searchText.toLowerCase().trim()}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={ onSearchSubmit }>
            <input 
            type="text"
            placeholder="Search a hero"
            className="form-control"
            name="searchText"
            autoComplete="off"
            value={ searchText }
            onChange={ onInputChange }
            autoFocus={true}
            />

            <button className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>


        </div>

        <div className="col-7">
        <h4>Result</h4>
          <hr />

          <div className="alert alert-primary" style={{display:  showSearch ? '' : 'none' }}>
            Search a hero
          </div>

          <div className="alert alert-danger" style={{display: showError ? '' : 'none'}}>
            No hero with <b>{q}</b>
          </div>

          {
            heroes.map( hero => ( <HeroCard key={hero.id} {...hero} /> ))
          }

        </div>
      </div>

    </>
  )
}
