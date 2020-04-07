import axios from 'axios'

export function request(config){
			//创建实例
			const instance1 = axios.create({
				baseURL:'http://106.54.54.237:8000/api/h8',
        // baseURL:'http://152.136.185.201:8000/api/h8',
        // baseURL:'http://123.207.32.32:8000/api/h8',

				timeout: 5000
			})
			instance1.interceptors.request.use(config => {
				return config
			},err =>{
				console.log(err)
			})

      instance1.interceptors.response.use(res => {
      	return res.data
      },err =>{
      	console.log(err)
      })
			return instance1(config)
}
