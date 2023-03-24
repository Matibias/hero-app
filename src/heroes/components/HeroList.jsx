import { getHeroesByPublisher } from "../helpers"



export const HeroList = ({publisher}) => {

  const heroes = getHeroesByPublisher( publisher );


  return (
    
    <>
      {
        heroes.map( hero => (
    <ul>
          {/* <li>{hero.id}</li> */}
          <li key={hero.id}>{hero.superhero}</li>
    </ul>
        ))
        
      }
      </>

  )
}
