import{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import {db} from "../firebaseConfig/firebase.js";

const productsDB = collection(db, "products");

const Create = ()=>{
    
    const handleSubmit = async e => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
     
        // Or you can work with it as a plain object:
        const bookData = Object.fromEntries(formData.entries());

        const bookRef = await addDoc(productsDB, bookData);

        e.target.reset();
    }

    return(
        <FormularioCarga onSubmit={handleSubmit}/>
    );

}

const FormularioCarga = ({onSubmit})=>{
    return (
      <form method="post" onSubmit={onSubmit}>
        <label>
            Title: <input name="title"/>
        </label>
        <label>
            Author: <input name="authors"/>
        </label>
        <label>
            Stock: <input name="stock"/>
        </label>
        <button type="submit">Cargar Libro</button>
      </form>
    );
  }

export default Create;
