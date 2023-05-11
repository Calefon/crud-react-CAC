import { collection, addDoc } from "firebase/firestore";
import {db} from "../firebaseConfig/firebase.js";
import "./Create.css"

import Swal from "sweetalert2"; 
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal);

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
        e.target.reset();

        Swal.fire({title:"Cargando libro",didOpen: ()=>{Swal.showLoading()}});

        await addDoc(productsDB, bookData).then(()=>{
            Swal.close();
            Swal.fire("Cargado!","Tu libro ha sido cargado","success");
        });
        
        
        
        
    }

    return(

        <div className="container m-5 p-3 d-flex flex-column border" id="formCont">
        <FormularioCarga onSubmit={handleSubmit}/>
        </div>
        
    );

}

const FormularioCarga = ({onSubmit})=>{
    return (
        <form method="post" onSubmit={onSubmit} className="d-flex flex-column align-items-center">
            <div className="form-group d-flex flex-column w-75 align-content-start mb-2">
                <label htmlFor="titleInput">Title</label>
                <input type="text" className="form-control" name="title" id="titleInput"/>
            </div>
            <div className="form-group d-flex flex-column w-75 align-content-start mb-2">
                <label htmlFor="authorsInput">Authors</label>
                <input type="text" className="form-control" id="authorsInput" name="authors"/>
            </div>
            <div className="form-group d-flex flex-column w-75 align-content-start mb-4">
                <label htmlFor="stockInput">Stock</label>
                <input type="number" min="1" max="999" className="form-control w-25" id="stockInput" name="stock"/>
            </div>
            <button type="submit" className="btn btn-success">Cargar Libro</button>
      </form>
    );
  }

export default Create;
