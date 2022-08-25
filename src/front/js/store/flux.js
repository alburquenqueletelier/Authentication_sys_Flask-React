const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loginuser: null,
			token: null,
		},
		actions: {
			login: (userinfo) => {
				fetch(process.env.BACKEND_URL + "/api/token",{
					headers: {
						'Content-Type': 'application/json'
					  },
					mode: 'cors',
					method: 'POST',
					body: JSON.stringify(userinfo)
				})
				.then(resp=>{
					return resp.json();
				})
				.then(data=>{
					sessionStorage.setItem('loginuser',JSON.stringify(data.user));
					sessionStorage.setItem('token',JSON.stringify(data.token));
					setStore({
						loginuser: data.user,
						token: data.token
					});
				})
				.catch(error=>console.log(error))
				return false
			},
			loginRemember: ()=>{
				let loginuser = JSON.parse(sessionStorage.getItem('loginuser'));
				let token = JSON.parse(sessionStorage.getItem('token'));
				return setStore({
					loginuser: loginuser,
					token: token
				})
			},
			logout: () => {
				sessionStorage.removeItem('loginuser');
				return setStore({loginuser: null})
			},
			signup: (data) => {
				const {login} = getActions();
				let info = {
					username: data.username,
					password: data.password
				}
				fetch(process.env.BACKEND_URL + "/api/signup", {
					headers: {
						'Content-Type': 'application/json'
					  },
					method: 'POST',
					body: JSON.stringify(data)
				})
				.then(resp=>resp.json())
				.then(data=>{
					alert(JSON.stringify(data))
					if (!data.Error){
						return login(info);
					}
					return false
				})
				.catch(error=>console.log(error))
		
				return false
			}
			
		}
	};
};

export default getState;
