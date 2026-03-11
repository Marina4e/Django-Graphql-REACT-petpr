import React from "react";
import {Link} from "react-router-dom";

function HomePage(){

return(

<div className="homePage">

<h2>Welcome to your Home Library 📚</h2>

<p>
Manage your personal book collection.
</p>

<Link to="/library">

<button className="homeButton">
Open Library
</button>

</Link>

</div>

)

}

export default HomePage