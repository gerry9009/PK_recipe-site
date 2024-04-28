import React from 'react';
import { Link } from 'react-router-dom';

export default function Recipeitem(props: {strMeal: string, strMealThumb: string, strCategory: string}) {
  return (
    <Link to={`/${props.strCategory.toLocaleLowerCase().replaceAll(' ','-')}/${props.strMeal.toLocaleLowerCase().replaceAll(' ','-')}`} className='recipe-item'>
        <img src={props.strMealThumb} alt={props.strMeal}/>
        <h3>
            {props.strMeal}
        </h3>
        <p>
            {props.strCategory}
        </p>   
    </Link>
    )
}
