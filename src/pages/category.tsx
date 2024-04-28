import {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import Recipeitem from '../components/recipeitem';
import RecipeApiName from '../recipeapi/recipeapiname';
import { useNavigate } from 'react-router-dom';

interface ApiItem {
  strMeal: string,
  strMealThumb: string,
  idMeal: string
};

interface Api{
  meals: Array<JSON>
};

export default function Category() {
  const navigate = useNavigate();
  const [recipeItems, setRecipeItems] = useState<Array<JSX.Element>>([<></>]);
  const [displayLocation, setDisplayLocation] = useState<string>();
  const {category} = useParams<string>();

  const url: string = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  
  const toApiItem =useCallback( (result: JSON) => {
    return result as unknown as Api;
  },[]);

  const toApiItemObject = useCallback((result: Api) => {
    return result.meals as unknown as ApiItem[];
  },[]);

  const toJsxElement = useCallback((result: JSON) => {
    const apiItem = toApiItem (result);
    const apiItemObject = toApiItemObject(apiItem);
    const res: Array<JSX.Element> = apiItemObject.map(r => <Recipeitem strMeal = {r.strMeal} strMealThumb = {r.strMealThumb} strCategory = {category!.replaceAll('-',' ')} key={r.idMeal}/>);
    return res;
  },[toApiItemObject, toApiItem, category]);


  const recipeApi = useCallback( async() => {
    const apiData: JSON = await RecipeApiName({url: url + category?.replaceAll('-',' ')});
    if(apiData === null){
      navigate('/');
    }
    else{
      setRecipeItems(toJsxElement(apiData));
    }
    
  },[toJsxElement, navigate, category]);

  useEffect(() =>{
    if (displayLocation !== category){
      recipeApi();
      setDisplayLocation(category);
    }
  },[category, recipeApi, displayLocation]);



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
