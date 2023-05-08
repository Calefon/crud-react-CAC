import{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import{collection,getDocs,deleteDoc,doc} from "firebase/firestore";
import {db} from "../fireBaseConfig/firebase.js";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal);

const Show = ()=>{
    //configuramos useState
    const [books,setBooks] = useState([]);
    //referemciamos la db de FS
    const booksCollection = collection(db,"products");

    const getBooks = async()=>{
        const data = await getDocs(booksCollection);
        console.log(data.docs)
        setBooks(
            data.docs.map((doc)=>({...doc.data(),id:doc.id}))
        );
        console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }

    const deleteBook = async(id)=>{
        const bookDoc = doc(db,"products",id);
        await deleteDoc(bookDoc);
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
        <h1>Products</h1>
        <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Stock</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map(
                    book => {
                        return(
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.authors}</td>
                            <td>{book.stock}</td>
                            <td>
                                <Link to={"/create"}></Link>
                                
                            </td>
                        </tr>);
                    }
                )}
            </tbody>
        </table>
</>
    );
}

export default Show;