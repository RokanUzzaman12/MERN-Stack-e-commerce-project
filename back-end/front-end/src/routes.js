const router = {
    home:"/",
    cart:"/cart",
    logIn:'/log-in',
    signUp:'/sign-up',
    admin:'/admin',
    aboutUs:'/about-us',
    contactUs:'/contact-us',
    // Product 
    addProduct:'/add-product',
    productCategory:'/product-category',
    productList:'/product-list',
    productDetailsById:`/product-details`,
    editProductById:'/edit-product',
    
    //slide image
    addSlideImage:'/add-slide-image',
    slideImageList:'/slide-image-list',

    // permission
    permission:'/permission',
    menu:'/menu',
    role:'/role',

    // Admin Auth
    adminSignUp:'/admin/sign-up',
    adminLogIn:'/admin/log-in',
    manageAdmin:'/manage/admin'

}

export default router