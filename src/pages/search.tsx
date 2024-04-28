import SearchImg from '../img/search2.png';
import { SyntheticEvent, useState, useEffect, useCallback} from 'react';
import Recipeitem from '../components/recipeitem';
import RecipeApiName from '../recipeapi/recipeapiname';
import { useNavigate, useParams } from "react-router-dom";


interface ApiItem {
  strMeal: string,
  strMealThumb: string,
  idMeal: string,
  strCategory: string,
  strDrinkAlternate: null,
  strArea: string,
  strInstructions: string,
  strTags: string,
  strYoutube: string,
  strIngredient1: string,
  strIngredient2: string,
  strIngredient3: string,
  strIngredient4: string,
  strIngredient5: string,
  strIngredient6: string,
  strIngredient7: string,
  strIngredient8: string,
  strIngredient9: string,
  strIngredient10: string,
  strIngredient11: string,
  strIngredient12: string,
  strIngredient13: string,
  strIngredient14: string,
  strIngredient15: string,
  strIngredient16: string,
  strIngredient17: string,
  strIngredient18: string,
  strIngredient19: string,
  strIngredient20: string,
  strMeasure1: string,
  strMeasure2: string,
  strMeasure3: string,
  strMeasure4: string,
  strMeasure5: string,
  strMeasure6: string,
  strMeasure7: string,
  strMeasure8: string,
  strMeasure9: string,
  strMeasure10: string,
  strMeasure11: string,
  strMeasure12: string,
  strMeasure13: string,
  strMeasure14: string,
  strMeasure15: string,
  strMeasure16: string,
  strMeasure17: string,
  strMeasure18: string,
  strMeasure19: string,
  strMeasure20: string,
  strSource: string,
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null
};

interface Api{
  meals: Array<JSON>
};


export default function Search() {

  const navigate = useNavigate();

  const [recipeItems, setRecipeItems] = useState<Array<JSX.Element>>([<></>]);
  const [isFirstApi,setFirstApi] = useState(true);
  const {name} =useParams();

  const url: string = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const toApiItem = useCallback((result: JSON) => {
    return result as unknown as Api;
  },[]);

  const toApiItemObject = useCallback((result: Api) => {
    return result.meals as unknown as ApiItem[];
  },[]);
  
  const toJsxElement = useCallback((result: JSON) => {
    const apiItem = toApiItem (result);
    const apiItemObject = toApiItemObject(apiItem);
    const res: Array<JSX.Element> = apiItemObject.map(r => <Recipeitem strMeal = {r.strMeal} strMealThumb = {r.strMealThumb} strCategory = {r.strCategory} key={r.idMeal}/>);
    return res;
  },[toApiItem, toApiItemObject]);


  const recipeApiSearch = useCallback(async() => {
    const data: JSON = await RecipeApiName({ url: url + name?.replaceAll(' ','-')});
    if(data === null){
      setRecipeItems([<div>Theres is no recipe.</div>]);
    }
    else{
      setRecipeItems(toJsxElement(data));
    }
  },[toJsxElement, name]);



  useEffect(() =>{
    if (isFirstApi){
      recipeApiSearch();
      setFirstApi(false);
    }
    
  },[isFirstApi, recipeApiSearch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    const target = e.target as typeof e.target & {
      name: {value: string};
    };

    let recipeName: string = target.name.value;

    while(true){
      if(recipeName.length !== 1){
        if(recipeName.slice(recipeName.length - 2, recipeName.length - 1) === ' '){
          recipeName = recipeName.slice(0, recipeName.length - 2);
        }
        else{
          break;
        }
      }
      else{
        if(recipeName === ' '){
          recipeName = ''
        }
        break;
      }
    }

    if(recipeName.slice(0,recipeName.length - 1) !== ''){
      setFirstApi(true);
      navigate(`/search/${recipeName.toLowerCase().replaceAll(' ', '-')}`);
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
            <input type="text" name="name" id="name" className="name-search"/>
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
