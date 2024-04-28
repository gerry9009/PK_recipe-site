import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

type Dispatcher<S> = Dispatch<SetStateAction<S>>

export default function Menu(props: {isMenuActive: boolean, showSliderMenu: boolean, setMenuActive: Dispatcher<boolean>}) {
    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        centerMode: true
    };

    const clickLinkMenu = () => {
        props.setMenuActive(false);
    };


  return (
    <>
        {props.showSliderMenu && 
          <nav className='menu-item-container-container'>
            <ul className='menu-item-container'>
              <Slider {...settings}>
                <li><Link to='/beef'>Beef</Link></li>
                <li><Link to="./chicken">Chicken</Link></li>
                <li><Link to="./dessert">Dessert</Link></li>
                <li><Link to="./lamb">Lamb</Link></li>
                <li><Link to="./miscellaneous">Miscellaneous</Link></li>
                <li><Link to="./pasta">Pasta</Link></li>
                <li><Link to="./pork">Pork</Link></li>
                <li><Link to="./seafood">Seafood</Link></li>
                <li><Link to="./side">Side</Link></li>
                <li><Link to="./vegan">Vegan</Link></li>
                <li><Link to="./vegetarian">Vegetarian</Link></li>
                <li><Link to="./goat">Goat</Link></li>
                <li><Link to="./starter">Starter</Link></li>
              </Slider>
            </ul>
          </nav>
          }

          {(function() {
            if(!props.showSliderMenu && props.isMenuActive) {
              return <nav className='menu-item-container-container'>
                <ul className='menu-item-container'>
                  <li><Link onClick={clickLinkMenu} to='/beef'>Beef</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./chicken">Chicken</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./dessert">Dessert</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./lamb">Lamb</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./miscellaneous">Miscellaneous</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./pasta">Pasta</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./pork">Pork</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./seafood">Seafood</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./side">Side</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./vegan">Vegan</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./vegetarian">Vegetarian</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./goat">Goat</Link></li>
                  <li><Link onClick={clickLinkMenu} to="./starter">Starter</Link></li>
                </ul>
              </nav>
            }
          })()} 
    </>
  )
}
