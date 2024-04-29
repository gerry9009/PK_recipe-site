import SearchImg from "../img/search2.png";
import { SyntheticEvent, useState, useEffect } from "react";
import Recipeitem from "../components/recipeitem";
import RecipeApiName from "../recipeapi/recipeapiname";
import { useNavigate } from "react-router-dom";

import ApiItem from "../types/apiTypes";

interface Api {
  meals: Array<JSON>;
}

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

export default function Home() {
  const navigate = useNavigate();

  const [recipeItems1, setRecipeItems1] = useState<Array<JSX.Element>>([<></>]);
  const [recipeItems2, setRecipeItems2] = useState<Array<JSX.Element>>([<></>]);
  const [recipeItems3, setRecipeItems3] = useState<Array<JSX.Element>>([<></>]);
  // const isFirstApi = useRef<boolean>(true);

  const url: string = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  useEffect(() => {
    async function recipeApiHome() {
      const apiData1: JSON = await RecipeApiName({ url: url + "beef and" });
      const apiData2: JSON = await RecipeApiName({ url: url + "alfredo" });
      const apiData3: JSON = await RecipeApiName({
        url: url + "eggplant with",
      });

      setRecipeItems1(toJsxElement(apiData1));
      setRecipeItems2(toJsxElement(apiData2));
      setRecipeItems3(toJsxElement(apiData3));
    }

    recipeApiHome();
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
    };

    let name: string = target.name.value;
    while (true) {
      if (name.length > 1) {
        if (name.slice(name.length - 2, name.length - 1) === " ") {
          name = name.slice(0, name.length - 2);
        } else {
          break;
        }
      } else {
        if (name === " ") {
          name = "";
        }
        break;
      }
    }

    if (name.slice(0, name.length - 1) !== "") {
      navigate(`/search/${name.toLowerCase().replaceAll(" ", "-")}`);
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
        <div id="recipes-container">
          {recipeItems1}
          {recipeItems2}
          {recipeItems3}
        </div>
      </article>
    </main>
  );
}
