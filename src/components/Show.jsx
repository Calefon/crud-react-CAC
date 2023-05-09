import{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import{collection,getDocs,deleteDoc,doc} from "firebase/firestore";
import {db} from "../firebaseConfig/firebase.js";
import "./Show.css"

import Swal from "sweetalert2"; 
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal);

const delSwal = Swal.mixin({
    title:'Estás Seguro/a?',
    text: "No podés revertir esta Acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, deseo borrarlo!"
});

const DeleteButton = ({onClick}) => { return (
    <div className="container tableButton d-flex flex-row justify-content-center">
    <button onClick={onClick} className="btn btn-danger btn-sm">
        <i className="fa-solid fa-trash fa-sm"></i>
    </button>
    </div>
    )};

const EditButton = ({productId}) => {
    return(
    <div className="container tableButton d-flex flex-row justify-content-center">
    <Link to={`/edit/${productId}`} className="btn btn-light btn-sm">
        <i className="fa-solid fa-pencil fa-sm"></i>
    </Link>
    </div>
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
                            <td className="d-flex flex-row justify-content-center">
                                <div className="container d-flex flex-row tBtnContainer">
                                <EditButton productId={book.id}/>
                                <DeleteButton onClick={()=>deleteFunction(book.id)}/>
                                </div>
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
        delSwal.fire().then(
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