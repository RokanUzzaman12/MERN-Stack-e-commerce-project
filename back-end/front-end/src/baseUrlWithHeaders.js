const baseUrlWithHeaders = 
    {
        baseUrl:'http://localhost:5000',
        prepareHeaders:(headers,{getState})=>{
            const userInfo = getState()
            let token = localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
              }
          
            return headers
        }
    }

export default baseUrlWithHeaders