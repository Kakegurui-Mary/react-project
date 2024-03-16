import axios from 'axios';
import moment from 'moment';
import React, {useState} from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {

  const state = useLocation().state;
  //If there is a state use it ex. title, if not it's gonna be empty
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();
  //console.log(value)

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/recipes/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/recipes/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='add'>
      <div className="content">
        <input type='text' value={title} placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
          <div className='editorContainer'>
            <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
          </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft 
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display:"none"}} type="file" id='file' onChange={(e) => setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">Upload Image</label>
          <div className='buttons'>
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>
          <div className='cat'>
            <input type="radio" checked={cat === "apetizer"} name='cat' value="apetizer" id='apetizer' onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="apetizer">Apetizer</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "dish"} name='cat' value="dish" id='dish' onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="dish">Dish</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "dessert"} name='cat' value="dessert" id='dessert' onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="dessert">Dessert</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "drink"} name='cat' value="drink" id='drink' onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="drink">Drink</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;