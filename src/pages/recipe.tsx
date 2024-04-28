import {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import RecipeApiName from '../recipeapi/recipeapiname';
import RecipeDiscription from '../components/recipediscription';


export default function Recipe() {
  const [recipeItems, setRecipeItems] = useState<Array<JSX.Element>>([<></>]);
  const [youtubeVideo, setYoutubeVideo] = useState('');
  const [recipeDiscription, setRecipeDiscription] =useState<JSON>(() => JSON);
  const [hideRecipe, setHideRecipe] = useState('hide-text');
  const [readMore, setReadMore] = useState(true);

  const isFirstApi = useRef(true);
  const {name} =useParams();

  const url: string = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const toJsxElement = (result: JSON) => {
    //for ciklus
    let res:Array<JSX.Element> = [];
    for(let i = 1; i< 21; i++){
      if(result[`strIngredient${i}`] !==''){
        res.push(<RecipeDiscription strIngredient={result[`strIngredient${i}`]} strMeasure={result[`strMeasure${i}`]}  key={i}/>);
      }
    }
    return res;
  };


  const recipeApiHome = async() => {
    const apiData: Array<JSON> = await RecipeApiName({url: url + name?.replaceAll('-',' ')});
    setRecipeDiscription(apiData[0]);
    console.log(apiData[0].strYoutube.replace('watch?v=','embed/'));
    setYoutubeVideo(apiData[0].strYoutube.replace('watch?v=','embed/'));

    
    if(apiData === null){
      setRecipeItems([<div>There is no recipe.</div>])
    }
    else{
      setRecipeItems(toJsxElement(apiData[0]));
    }
    
  }

  useEffect(() =>{
    if (isFirstApi.current){
      recipeApiHome();
      isFirstApi.current = false;
    }
  },[]);

  const handleClick = () => {
    setHideRecipe('');
    setReadMore(false);
  };



  return (
    <main>
        <div className="recipe-discription">

          <div className='recipe-header' style={{backgroundImage: `url(${recipeDiscription.strMealThumb})`}}>
            <h2>          
              {recipeDiscription.strMeal}
            </h2>
          </div>

          <div className='recipe-main '>
            <div className={`recipe-video-text ${hideRecipe}`}>
              { youtubeVideo !== '' &&
                <iframe src={youtubeVideo} width="560" height="315" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              }
              <p>
                {recipeDiscription.strInstructions}
              </p>
            </div>

            <div className={`recipe-ingredients-container ${hideRecipe}`}>
              <div className="recipe-ingredients">
                <div className='decoration'></div>
                <div className='decoration'></div>
                {recipeItems}
                <div className='decoration'></div>
                <div className='decoration'></div>
              </div>
            </div>

            {readMore && <div className='read-more' onClick={handleClick}>
              Read more
            </div>}
          </div>

          

          

          
        
        
        </div>
        
    </main>
  )
}
