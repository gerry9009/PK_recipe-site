
export default async function RecipeApiName(props: {url: string} ) {

    const toJson = (data: Response) => {
      return data.json();
    }
    try{
      const response: Response = await fetch(props.url);
      const data: JSON = await toJson(response);
      return data;
    }
    catch (e){
      console.error('Hiba: ', e );
      let data: JSON = JSON.parse(JSON.stringify({hiba: e}));
      return data;
    }
  };