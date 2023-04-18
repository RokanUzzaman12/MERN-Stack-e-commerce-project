import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../routes.js'
import './adminSidebar.css'
const AdminSidebar = () => {

    let navData = [
        {
            id: 1,
            title: 'product',
            rightIcon:<i className="fa-solid fa-chevron-right nav-icon"  ></i>,
            subNav: [
                {
                    subNavId: 11,
                    navId:1,
                    subNavTitle: 'add product',
                    routePath:'/add-product'
                },

                {
                    subNavId: 12,
                    navId:1,
                    subNavTitle: 'product list',
                    routePath:'/product-list'
                }
            ]
        },

        {
            id: 2,
            title: 'post',
            rightIcon:<i className="fa-solid fa-chevron-right nav-icon"  ></i>,
            subNav: [
                {
                    subNavId: 11,
                    id: 2,
                    subNavTitle: 'add post',
                    routePath:''
                },

                {
                    subNavId: 12,
                    id: 2,
                    subNavTitle: 'post list',
                    routePath:''
                }
            ]
        }
    ]

    const [dropdown, setDropdown] = useState([])
    const [show, setShow] = useState(false)
    const [navigation, setNavigation] = useState(navData)
    const [previousNavId,setPreviousNavId] = useState(null)


    // useEffect(() => {
    //     showChildBar()
    // }, [])

    // let showChildBar = () => {
    //     setShow(!show)

    // }

    let handelSubNav = ()=>{
        console.log('good to go')
        setShow(true)
    }

    let showHandle = (navId)=>{   
        if(show == false){
            setShow(!show)
        }
        console.log('false')
        let tempData = navData
        let subNavIndex = tempData.findIndex((temp)=>temp.id == navId)



        tempData.map((item)=>{
            
            if(item.id == navId){
                item.subNav = tempData[subNavIndex].subNav
                item.rightIcon = <i className="fa-solid fa-chevron-down nav-icon" ></i>
            }else{
                item.subNav = []
                item.rightIcon = <i className="fa-solid fa-chevron-right nav-icon" ></i>
            }
        })

        if(previousNavId && previousNavId == navId){
            
            setShow(!show)
            if(show == false){
                tempData[subNavIndex].rightIcon = <i className="fa-solid fa-chevron-down nav-icon" ></i>
            }else{
                tempData[subNavIndex].rightIcon = <i className="fa-solid fa-chevron-right nav-icon" ></i>
            }
            
        }
        
        setNavigation(tempData)
        setPreviousNavId(navId)
    }

    return (
        <div className="side-bar">

            <div className="search-by-other">
                <p>Admin Dashboard</p>

                {
                    navigation.map((nav,index) => (
                        <ul key={nav.id}>
                            <li className='product-button'  > <span onClick={()=>showHandle(nav.id)} > {nav.title} {nav.rightIcon} </span> 
                                <ul className='childNav' >
                                    {
                                    
                                    show?nav.subNav.map((item) => (
                                      <li> <Link to={item.routePath} onClick={()=>handelSubNav()} className='childNavIdem' key={item.subNavId} >{item.subNavTitle} </Link> </li>   
                                    )):''
                                    
                                    }
                                </ul>
                            </li>
                        </ul>
                    ))
                }



            </div>




        </div>
    )
}

export default AdminSidebar