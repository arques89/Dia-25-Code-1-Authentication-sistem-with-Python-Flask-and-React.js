const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: []

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp =  fetch(process.env.BACKEND_URL + "/api/hello")
					const data =  resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend")
				}
			},


			getLogin: () => {
				
				fetch(process.env.BACKEND_URL + "/api/login")
				.then(resp => resp.json())
				.then(data => setStore({user: data}))
				.catch(error => console.log("Error loading message from backend", error));
					
				
			},

			getSignup: () => {
				
				fetch(process.env.BACKEND_URL + "/api/signup")
				.then(resp => resp.json())
				.then(data => setStore({user: data}))
				.catch(error => console.log("Error loading message from backend", error));
					
				
			},

			// getMessage: () => {
				
			// 	fetch(process.env.BACKEND_URL + "/api/login")
			// 	.then(resp => resp.json())
			// 	.then(data => setStore({message: data.message}))
			// 	.catch(error => console.log("Error loading message from backend", error));
					
				
			// },




			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
