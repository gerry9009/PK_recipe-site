
import { Dispatch, SetStateAction } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

export default async function RecipeApiName(props: {url: string} ) {

    const toJson = (data: Response) => {
      return data.json();
    }
    try{
      const response: Response = await fetch(props.url);
      const data: JSON = await toJson(response);
      return data.meals;
    }
    catch (e){
      console.error('Hiba: ', e );
      let data: Array<JSON> = [JSON.parse(JSON.stringify({hiba: e}))];
      return data;
    }
  };