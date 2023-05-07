import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../routes.js'
import './adminSidebar.css'
const AdminSidebar = () => {
    
    let navData = [
        {
            _id: 1,
            title: 'product',
            rightIcon:<i className="fa-solid fa-chevron-right nav-icon"  ></i>,
            subNav: [
                {
                    _id: 11,
                    navId:1,
                    subNavTitle: 'add product',
                    routePath:'/add-product'
                },

                {
                    _id: 12,
                    navId:1,
                    subNavTitle: 'product list',
                    routePath:'/product-list'
                }
            ]
        },

        {
            _id: 2,
            title: 'post',
            rightIcon:<i className="fa-solid fa-chevron-right nav-icon"  ></i>,
            subNav: [
                {
                    _id: 11,
                    navId: 2,
                    subNavTitle: 'add post',
                    routePath:''
                },

                {
                    _id: 12,
                    navId: 2,
                    subNavTitle: 'post list',
                    routePath:''
                }
            ]
        },

        {
            _id: 3,
            title: 'Slide Image',
            rightIcon:<i className="fa-solid fa-chevron-right nav-icon"  ></i>,
            subNav: [
                {
                    _id: 31,
                    navId: 3,
                    subNavTitle: 'add slide-image',
                    routePath:'/add-slide-image'
                },

                {
                    _id: 32,
                    navId: 3,
                    subNavTitle: 'slide-image list',
                    routePath:'/slide-image-list'
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
        setShow(true)
    }

    let showHandle = (navId)=>{   
        if(show == false){
            setShow(!show)
        }
        let tempData = navData
        let subNavIndex = tempData.findIndex((temp)=>temp._id == navId)



        tempData.map((item)=>{
            
            if(item._id == navId){
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
                        <ul key={nav._id}>
                            <li className='product-button'  > <span onClick={()=>showHandle(nav._id)} > {nav.title} {nav.rightIcon} </span> 
                                <ul className='childNav' >
                                    {
                                    
                                    show?nav.subNav.map((item) => (
                                      <li> <Link to={item.routePath} onClick={()=>handelSubNav()} className='childNavIdem' key={item._id} >{item.subNavTitle} </Link> </li>   
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