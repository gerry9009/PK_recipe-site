import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Recipeitem from '../components/recipeitem';
import RecipeApiName from '../recipeapi/recipeapiname';
import { useNavigate } from 'react-router-dom';


export default function Category() {
  const navigate = useNavigate();
  const [recipeItems, setRecipeItems] = useState<Array<JSX.Element>>([<></>]);
  const [displayLocation, setDisplayLocation] = useState<string>();
  const {category} = useParams();

  const url: string = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  const toJsxElement = (result: Array<JSON>) => {
    const res: Array<JSX.Element> = result.map(r => <Recipeitem strMeal = {r.strMeal} strMealThumb = {r.strMealThumb} strCategory = {category?.replaceAll('-',' ')} key={r.idMeal}/>);
    return res;
  };


  const recipeApiHome = async() => {
    const apiData: Array<JSON> = await RecipeApiName({url: url + category?.replaceAll('-',' ')});
    if(apiData === null){
      navigate('/');
    }
    else{
      setRecipeItems(toJsxElement(apiData));
    }
    
  }

  useEffect(() =>{
    if (displayLocation !== category){
      recipeApiHome();
      setDisplayLocation(category);
    }
  },[category]);



  return (
    <main>
        <section className="search-section">
        <div className="form-h2">
            <div></div>
            <div></div>
            <div></div>
            <h2>          
            {category?.charAt(0).toUpperCase() + category!.slice(1)}
            </h2>
        </div>
        
        
        </section>
        <article>
        <h2 className="recipes-container-header">Recipes</h2>
        <div id="recipes-container">{recipeItems}</div>
        </article>
    </main>
  )
}
