import SearchImg from '../img/search2.png';
import { SyntheticEvent, useState, useEffect, useRef} from 'react';
import Recipeitem from '../components/recipeitem';
import RecipeApiName from '../recipeapi/recipeapiname';
import { useNavigate } from "react-router-dom";



export default function Home() {

  
  const navigate = useNavigate()

  const [recipeItems, setRecipeItems] = useState([<></>]);
  const isFirstApi = useRef(true);

  const url: string = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  
  const toJsxElement = (result: Array<JSON>) => {
    const res: Array<JSX.Element> = result.map(r => <Recipeitem strMeal = {r.strMeal} strMealThumb = {r.strMealThumb} strCategory = {r.strCategory} key={r.idMeal}/>);
    return res;
  };


  const recipeApiHome = async() => {
    const apiData: Array<JSON> = await RecipeApiName({url: url + 'beef and'});
    if(apiData === null){
      setRecipeItems([<div>There is no recipe. key={0}</div>])
    }
    else{
      setRecipeItems(toJsxElement(apiData));
    }
    
  }

  useEffect(() =>{
    if (isFirstApi.current){
      recipeApiHome();
      isFirstApi.current = false;
    }
  },[]);


  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    const target = e.target as typeof e.target & {
      name: {value: string};
    };

    let name: string = target.name.value;
    //átnézni
    while(true){
      if(name.length !== 1){
        if(name.slice(name.length - 2, name.length - 1) === ' '){
          name = name.slice(0, name.length - 2);
        }
        else{
          break;
        }
      }
      else{
        if(name === ' '){
          name = ''
        }
        break;
      }
      
    }

    if(name.slice(0,name.length - 1) !== ''){
      //kell(target.name.value);
      navigate(`/search/${name.toLowerCase().replaceAll(' ', '-')}`);
    }
    
  };

  

  
  
  return (
    <main>
      <section className="search-section">
        <div className="form-h2">
          <div></div>
          <div></div>
          <div></div>
          <h2>          
            Find recipes
          </h2>
        </div>
        
        <form action="/" method="Get" onSubmit={handleSubmit}>
            <input type="text" name="name" id="name" className="name-search" />
            <input type="image" src={SearchImg} name="Submit" className="submit" alt='Search'/>
        </form>
      </section>
      <article>
        <h2 className="recipes-container-header">Recipes</h2>
        <div id="recipes-container">{recipeItems}</div>
      </article>
    </main>
  )
}
