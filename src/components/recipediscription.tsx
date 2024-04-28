export default function RecipeDiscription(props: {strIngredient :string, strMeasure: string}) {
    
  return (
    <div className="ingredient">
        {props.strMeasure} {props.strIngredient.toLowerCase()}
    </div>
    )
}