export default function RecipeDiscription(props: {strIngredient :string , strMeasure: string }) {
    
  return (
    <li className="ingredient">
        {props.strMeasure} {props.strIngredient.toLowerCase()}
    </li>
    )
}