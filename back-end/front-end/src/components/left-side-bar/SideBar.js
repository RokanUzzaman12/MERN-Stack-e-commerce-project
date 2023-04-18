import './sidebar.css'
const SideBar = ()=>{
    return (
        <div className="side-bar">
           
                <div className="search-by-name">
                    <label>Name</label>
                    <input type="text" placeholder="Searcha By Name"/>
                </div>

                <div className="search-by-other">
                    <p>Brand Name</p>
                    <ul>
                        <li> <input type="radio"/> <label>Rolex</label> </li>
                        <li> <input type="radio"/> <label>Casio</label> </li>
                        <li> <input type="radio"/> <label>Fossil</label> </li>
                        <li> <input type="radio"/> <label>Oris</label> </li>
                        <li> <input type="radio"/> <label>Laurine</label> </li>
                    </ul>
                    

                </div>

                <div className="search-by-other">
                    <p>Price Range</p>
                    <ul>
                        <li> <input type="radio"/> <label>100 - 1000</label> </li>
                        <li> <input type="radio"/> <label>1001 - 2000</label> </li>
                        <li> <input type="radio"/> <label>2001 - 3000</label> </li>
                        <li> <input type="radio"/> <label>3001 - 4000</label> </li>
                        <li> <input type="radio"/> <label>4001 - 5000</label> </li>
                    </ul>
                    

                </div>
          
            
        </div>
    )
}

export default SideBar