import{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import {db} from "../firebaseConfig/firebase.js";

import "./Create.css"

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
        <div className="container m-5 p-3 d-flex flex-column border" id="formCont">
        <FormularioCarga onSubmit={handleSubmit}/>
        </div>
    );

}

const FormularioCarga = ({onSubmit})=>{
    return (
        <form method="post" onSubmit={onSubmit} className="d-flex flex-column align-items-start">
            <div className="form-group d-flex flex-column align-content-start mb-2">
                <label for="titleInput">Title</label>
                <input type="text" className="form-control" name="title" id="titleInput"/>
            </div>
            <div className="form-group d-flex flex-column align-content-start mb-2">
                <label for="authorsInput">Authors</label>
                <input type="text" className="form-control" id="authorsInput" name="authors"/>
            </div>
            <div className="form-group d-flex flex-column align-content-start mb-4">
                <label for="stockInput">Stock</label>
                <input type="number" min="1" max="999" className="form-control" id="stockInput" name="stock"/>
            </div>
            <button type="submit" className="btn btn-success">Cargar Libro</button>
      </form>
    );
  }

export default Create;
