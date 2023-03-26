import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string'
import { getHeroByName } from "../helpers";
import { useForm } from "../../hook/useForm";

export const useSearch = () => {
  
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

  return {
    showSearch,
    showError,
    onInputChange,
    onSearchSubmit,
    searchText,
    heroes,
    q
  }

}
