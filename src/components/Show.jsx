import{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import{collection,getDocs,deleteDoc,doc} from "firebase/firestore";
import {db} from "../firebaseConfig/firebase.js";

import Swal from "sweetalert2"; 
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal);

const DeleteButton = ({onClick}) => { return (
    <button onClick={onClick} className="btn btn-danger">
        <i className="fa-solid fa-trash"></i>
    </button>
    )};

const EditButton = ({productId}) => {
    return(
    <Link to={`/edit/${productId}`} className="btn btn-light">
        <i className="fa-solid fa-pencil"></i>
    </Link>
    );}

const AwesomeProductsTable = ({productsArray,deleteFunction}) => {
    return (
        <table className="table table-dark table-hover">
            <thead>
                <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Stock</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {productsArray.map(
                    book => {
                        return(
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.authors}</td>
                            <td>{book.stock}</td>
                            <td>
                                <EditButton productId={book.id}/>
                                <DeleteButton onClick={()=>deleteFunction(book.id)}/>
                            </td>
                        </tr>);
                    }
                )}
            </tbody>
        </table>
    );
}

const Show = ()=>{
    //configuramos useState
    const [books,setBooks] = useState([]);
    //referemciamos la db de FS
    const booksCollection = collection(db,"products");

    const getBooks = async()=>{
        const data = await getDocs(booksCollection);
        
        setBooks(
            data.docs.map((doc)=>({...doc.data(),id:doc.id}))
        );
    }

    const deleteBook = async(id)=>{
        const bookDoc = doc(db,"products",id);
        await deleteDoc(bookDoc);
        getBooks();
    }

    const confirmDelete = (id)=>{
        Swal.fire(
            {
                title:'Estás Seguro/a?',
                text: "No podés revertir esta Acción!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, deseo borrarlo!"
            }
        ).then(
            (result)=>{
                if(result.isConfirmed){
                    deleteBook(id);
                    Swal.fire("Borrado!","Tu libro ha sido borrado","success");
                }
            }
        );
    }

    useEffect(()=>{
        getBooks()
    },[]);

    return(
        <>
        <div className="container">
            <div className="col">
                <div className="row">
                    <div className="d-grid gap-2">
                        <Link to="/create" className="btn btn-secondary mt-2 mb-2">CREAR</Link>
                    </div>
                    <AwesomeProductsTable productsArray={books} deleteFunction={confirmDelete}/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Show;