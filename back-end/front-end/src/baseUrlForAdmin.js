const baseUrlForAdmin = 
    {
        baseUrl:'http://localhost:5000',
        prepareHeaders:(headers,{getState})=>{
            const userInfo = getState()
            let token = localStorage.getItem('admin-token')?JSON.parse(localStorage.getItem('admin-token')):null
            if (token) {
                headers.set('adminauthorization', `Bearer ${token}`)
              }
          
            return headers
        }
    }

export default baseUrlForAdmin