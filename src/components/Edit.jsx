import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig/firebase";
import { useEffect,useState } from "react";



const Edit = () => {
    let { bookId } = useParams();
    const [bookData, setBookData] = useState({title:"",authors:"",stock:0})
    const [title,setTitle] = useState("");
    const [authors,setAuthors] = useState("");
    const [stock,setStock] = useState(0);

    const setUp = async()=>{    
        const bookRef = doc(db, "products", bookId);
        const bookDoc = await getDoc(bookRef);
        setBookData({...bookDoc.data(),id:bookDoc.id,bookRef:bookRef});
    }

    useEffect(()=>{
        setUp()
    },[]);

    const handleChange = e => {
        let newBookData = {...bookData}
        newBookData[e.target.name]=e.target.value;
        setBookData(newBookData);
    }

    const handleSubmit = async e => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
     
        // Or you can work with it as a plain object:
        const bookNewData = Object.fromEntries(formData.entries());

        await updateDoc(bookData.bookRef, bookNewData);

        e.target.reset();
    }

    return(
        <div className="container m-5 p-3 d-flex flex-column border" id="formCont">
        <FormularioEdicion onSubmit={handleSubmit} bookData={bookData} onChange={handleChange}/>
        </div>
    );
}


const FormularioEdicion = ({onSubmit,bookData,onChange})=>{
    return (
        <form method="post" onSubmit={onSubmit} className="d-flex flex-column align-items-start">
            <div className="form-group d-flex flex-column align-content-start mb-2">
                <label htmlFor="titleInput">Title</label>
                <input type="text" onChange={onChange} value={bookData.title} className="form-control" name="title" id="titleInput"/>
            </div>
            <div className="form-group d-flex flex-column align-content-start mb-2">
                <label htmlFor="authorsInput">Authors</label>
                <input type="text" onChange={onChange} value={bookData.authors} className="form-control" id="authorsInput" name="authors"/>
            </div>
            <div className="form-group d-flex flex-column align-content-start mb-4">
                <label htmlFor="stockInput">Stock</label>
                <input type="number" onChange={onChange} value={bookData.stock} className="form-control" id="stockInput" name="stock"/>
            </div>
            <button type="submit" className="btn btn-success">Confirmar cambios</button>
      </form>
    );
  }

export default Edit;