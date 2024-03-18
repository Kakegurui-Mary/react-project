import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Menu = ({cat}) => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/recipes/?cat${cat}`);
        setRecipes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

    // const recipes = [
    //     {
    //       id: 1,
    //       title: "Lorem ipsum blabla blabla blabla blabla blabla",
    //       desc: "Lorem ipsum blabla blabla blabla blabla blabla",
    //       img: "https://www.siftandsimmer.com/wp-content/uploads/2022/04/sakura-strawberry-latte4.jpg",
    //     },
    //     {
    //       id: 2,
    //       title: "Lorem ipsum blabla blabla blabla blabla blabla",
    //       desc: "Lorem ipsum blabla blabla blabla blabla blabla",
    //       img: "https://images.lecker.de/pancake-teig-b2.jpg,id=a53e72bd,b=lecker,w=980,ca=4.80,8.00,94.80,98.13,rm=sk.webp",
    //     },
    //   ];

  return (
    <div className='menu'>
        {/* Rezepte nach Kategorie vorschlagen */}
        <h1>Other recipes you may like</h1>
        {recipes.map((recipe) =>(
            <div className='recipe' key={recipe.id}>
                <img src={`../upload/${recipe?.img}`} alt=''/>
                <h2>{recipe.title}</h2>
                <button>Read more</button>
            </div>
        ))}
    </div>
  );
};

export default Menu;