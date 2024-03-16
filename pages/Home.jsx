import React, { useState } from 'react'
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/recipes${cat}`);
        setRecipes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  // const recipes = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum blabla blabla blabla blabla blabla",
  //     desc: "Lorem ipsum blabla blabla blabla blabla blabla",
  //     img: "https://www.siftandsimmer.com/wp-content/uploads/2022/04/sakura-strawberry-latte4.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum blabla blabla blabla blabla blabla",
  //     desc: "Lorem ipsum blabla blabla blabla blabla blabla",
  //     img: "https://images.lecker.de/pancake-teig-b2.jpg,id=a53e72bd,b=lecker,w=980,ca=4.80,8.00,94.80,98.13,rm=sk.webp",
  //   },
  // ];

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className='recipes'>
        {recipes.map((recipe) =>(
          <div className='recipe' key={recipe.id}>
            <div className='img'>
              <img src={`../upload/${recipe.img}`} alt=''/>
            </div>
            <div className='content'>
              <Link className='link' to={`/recipe/${recipe.id}`}>
                <h1>{recipe.title}</h1>
              </Link>
                <p>{getText(recipe.desc)}</p>
                <button>Read more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;