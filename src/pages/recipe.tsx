import {useState, useEffect, useRef, KeyboardEvent, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import RecipeApiName from '../recipeapi/recipeapiname';
import RecipeDiscription from '../components/recipediscription';
import Recipeitem from '../components/recipeitem';



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



export default function Recipe() {
  const [recipeItems, setRecipeItems] = useState<Array<JSX.Element>>([<></>]);
  const [recipeItemsArray, setRecipeItemsArray] = useState<Array<JSX.Element>>([<></>]);
  const [youtubeVideo, setYoutubeVideo] = useState<string>('');
  const [recipeDiscription, setRecipeDiscription] =useState<ApiItem>();
  const [hideRecipeText, setHideRecipeText] = useState<string>('hide-text');
  const [hideRecipeIngredients, setHideRecipeIngredients] = useState<string>('hide-ingredients');
  const [readMore, setReadMore] = useState<boolean>(true);

  const isFirstApi = useRef(true);
  const {name} =useParams();
  const {category} = useParams();

  const url: string = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlCategory: string = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  const toApiItem = useCallback( (result: JSON) => {
    return result as unknown as Api;
  },[]);

  const toApiItemObject = useCallback( (result: Api) => {
    return result.meals[0] as unknown as ApiItem;
  },[]);

  const toApiItemObjectArray = useCallback( (result: Api) => {
    return result.meals as unknown as ApiItem[];
  },[]);

  const toJsxElement = useCallback( (result: ApiItem) => {
    let res:Array<JSX.Element> = [];
    let k: keyof ApiItem;
    let b: Array<string> = [];
    let a: Array<string> = [];

    for(k in result){
      if(k!.search('strIngredient') !== -1){
        a.push( JSON.stringify(result[k]).replaceAll('"','') );
      }
      if(k.search('strMeasure') !== -1){
        b.push( JSON.stringify(result[k]).replaceAll('"',''));
      }
    }

    for(let i:number = 0; i < a.length; i++){
      if(a[i] !== ''){
        res.push(<RecipeDiscription strIngredient={a[i]} strMeasure={b[i]}  key={i++}/>);
      }
    }
    return res;
  },[]);


  const toJsxElementArray = useCallback((result: Array<ApiItem>, apiItemObject: ApiItem) => {
    const res: Array<JSX.Element> = result.filter(r => r.strMeal !== apiItemObject?.strMeal).map(r => <Recipeitem strMeal = {r.strMeal} strMealThumb = {r.strMealThumb} strCategory = {category!.replaceAll('-',' ')} key={r.idMeal}/>);
    return res;
  },[category]);


  const recipeApi = useCallback( async() => {
    const apiData: JSON = await RecipeApiName({url: url + name?.replaceAll('-',' ')});
    const apiDataArray: JSON = await RecipeApiName({url: urlCategory + category?.replaceAll('-',' ')});
    const apiItem = toApiItem (apiData);
    const apiItemArray = toApiItem (apiDataArray);
    const apiItemObject = toApiItemObject(apiItem);
    const apiItemObjectArray = toApiItemObjectArray(apiItemArray);

    setRecipeDiscription(apiItemObject);
    setYoutubeVideo(apiItemObject.strYoutube.replace('watch?v=','embed/'));

    if(apiData === null){
      setRecipeItems([<div>There is no recipe.</div>])
    }
    else{
      setRecipeItems(toJsxElement(apiItemObject));
    }
    setRecipeItemsArray(toJsxElementArray(apiItemObjectArray, apiItemObject));
  },[toApiItem, toApiItemObject, toJsxElement, name, category, toJsxElementArray, toApiItemObjectArray]);



  useEffect(() =>{
    if (isFirstApi.current){
      recipeApi();
      isFirstApi.current = false;
    }
  },[recipeApi]);

  const handleClick = () => {
    setHideRecipeText('');
    setReadMore(false);
    setHideRecipeIngredients('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if(e.code === 'Ener'){
      handleClick();
    }
  };



  return (
    <main>
        <div className="recipe-discription">

          <div className='recipe-header' style={{backgroundImage: `url(${recipeDiscription?.strMealThumb})`}}>
            <h2>          
              {recipeDiscription?.strMeal}
            </h2>
          </div>

          <div className='recipe-main '>
            <div className={`recipe-video-text ${hideRecipeText}`}>
              { youtubeVideo !== '' &&
                <iframe src={youtubeVideo} width="560" height="315" frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" allowFullScreen title={recipeDiscription?.strMeal}>
                </iframe>
              }
              <p>
                {recipeDiscription?.strInstructions}
              </p>
            </div>

            <div className={`recipe-ingredients-container ${hideRecipeIngredients}`}>
              <div className="recipe-ingredients">
                <div className='decoration'></div>
                <div className='decoration'></div>
                <ul>
                  {recipeItems}
                </ul>
                
                <div className='decoration'></div>
                <div className='decoration'></div>
              </div>
            </div>

            {readMore && <div className='read-more' onClick={handleClick} tabIndex={0} onKeyDown={handleKeyDown}>
              Read more
            </div>}
          </div>
        </div>
        {recipeItemsArray.length !== 0 &&
          <section className='another-recipes'>
            <h2>You’ll Also Love</h2>
            <div id="recipes-container">{recipeItemsArray}</div>
          </section>
        }
        
        
    </main>
  )
}
