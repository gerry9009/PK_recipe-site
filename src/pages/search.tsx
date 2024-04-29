import SearchImg from "../img/search2.png";
import { SyntheticEvent, useState, useEffect } from "react";
import Recipeitem from "../components/recipeitem";
import RecipeApiName from "../recipeapi/recipeapiname";
import { useNavigate, useParams } from "react-router-dom";

import ApiItem from "../types/apiTypes";

interface Api {
  meals: Array<JSON>;
}

export default function Search() {
  const navigate = useNavigate();

  const [recipeItems, setRecipeItems] = useState<Array<JSX.Element>>([<></>]);
  const { name } = useParams();

  const url: string = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  const toApiItem = (result: JSON) => {
    return result as unknown as Api;
  };

  const toApiItemObject = (result: Api) => {
    return result.meals as unknown as ApiItem[];
  };

  const toJsxElement = (result: JSON) => {
    const apiItem = toApiItem(result);
    const apiItemObject = toApiItemObject(apiItem);
    const res: Array<JSX.Element> = apiItemObject.map((r) => (
      <Recipeitem
        strMeal={r.strMeal}
        strMealThumb={r.strMealThumb}
        strCategory={r.strCategory}
        key={r.idMeal}
      />
    ));
    return res;
  };

  useEffect(() => {
    const recipeApiSearch = async () => {
      const data: JSON = await RecipeApiName({
        url: url + name?.replaceAll(" ", "-"),
      });
      if (data === null) {
        setRecipeItems([<div>Theres is no recipe.</div>]);
      } else {
        setRecipeItems(toJsxElement(data));
      }
    };
    recipeApiSearch();
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
    };

    let recipeName: string = target.name.value;

    while (true) {
      if (recipeName.length !== 1) {
        if (
          recipeName.slice(recipeName.length - 2, recipeName.length - 1) === " "
        ) {
          recipeName = recipeName.slice(0, recipeName.length - 2);
        } else {
          break;
        }
      } else {
        if (recipeName === " ") {
          recipeName = "";
        }
        break;
      }
    }

    if (recipeName.slice(0, recipeName.length - 1) !== "") {
      navigate(`/search/${recipeName.toLowerCase().replaceAll(" ", "-")}`);
    }
  };

  return (
    <main>
      <section className="search-section">
        <div className="form-h2">
          <div></div>
          <div></div>
          <div></div>
          <h2>Find recipes</h2>
        </div>

        <form action="/" method="Get" onSubmit={handleSubmit}>
          <input type="text" name="name" id="name" className="name-search" />
          <input
            type="image"
            src={SearchImg}
            name="Submit"
            className="submit"
            alt="Search"
          />
        </form>
      </section>
      <article>
        <h2 className="recipes-container-header">Recipes</h2>
        <div id="recipes-container">{recipeItems}</div>
      </article>
    </main>
  );
}
