const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getContacts: async () => {
				const response = await fetch(
				  "https://playground.4geeks.com/contact/agendas/Knightlife27/contacts"
				);
				if (!response.ok) {getActions().createAgenda()
					return;
				}
				const data = await response.json();
				setStore({ contacts: data.contacts });
			  },
			  addContact: async (name, phone, email, address) => {
				const store = getStore();
				const response = await fetch(
				  "https://playground.4geeks.com/contact/agendas/Knightlife27/contacts",
				  {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
					  name: name,
					  phone: phone,
					  email: email,
					  address: address,
					}),
				  }
				);
				const data = await response.json();
				getActions().getContacts()
			  },
			  deleteContact: async (id) => {
				const store = getStore();
				const response = await fetch(
				  "https://playground.4geeks.com/contact/agendas/KnightLife27/contacts/" + id,
				  {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				  }
				);
				const data = await response.json();
				getActions().getContacts()

			  },
			  editContact: async (id, name, phone, email, address) => {
				const store = getStore();
				const response = await fetch(
				  "https://playground.4geeks.com/contact/agendas/KnightLife27/contacts/" + id,
				  {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
					  full_name: name,
					  phone: phone,
					  email: email,
					  address: address,
					}),
				  }
				);
				const data = await response.json();
				getActions().getContacts()
			  },

			  createAgenda: async () => {
				const store = getStore();
				const response = await fetch(
				  "https://playground.4geeks.com/contact/agendas/Knightlife27/",
				  {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
					}),
				  }
				);
				const data = await response.json();
			
			  },
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
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
