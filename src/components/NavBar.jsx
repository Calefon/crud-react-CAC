import {Link} from "react-router-dom";

const NavBar = ()=>{
    return(
        <nav className="navbar w-100 navbar-dark bg-dark d-flex flex-row justify-content-start"> 
            <Link className="navbar-brand ms-3" to="/">CAC 4.0</Link>
            <div className="d-flex flex-row justify-content-start ms-3" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto d-flex flex-row justify-content-start">
                    <li className="nav-item active me-3">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/create">Create</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;