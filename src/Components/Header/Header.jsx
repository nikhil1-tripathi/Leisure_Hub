import { Link } from "react-router-dom"
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import { useEffect, useState } from "react";
export const Header = () => {
    return (

        <div onClick={() => {
            window.scroll(0, 0)
        }} id="Navbar">
            <div id="Navbar_box1">
                <p >  Entertainment Hub</p>
            </div>
            {/* <div id="Search">
                <input placeholder="SEARCH YOUR FAV MOVIE AND WEB SERIES" />
            </div> */}
            <div id="Navbar_box2">
                <Link to="/" ><div className="Navbar_box2_1"> < WhatshotIcon className="icon" /> <p >Trending</p>
                </div> </Link>
                <Link to="/movies"><div className="Navbar_box2_1"> < MovieCreationIcon className="icon" /> <p >Movies</p>  </div></Link>
                <Link to="/tvSeries"><div className="Navbar_box2_1"> <  DesktopWindowsIcon className="icon" /> <p >TV Series</p>  </div></Link>
                <Link to="/search"><div className="Navbar_box2_1"> <  SearchIcon className="search" /> <p >Search</p>  </div></Link>
            </div>
        </div>
    )
}
