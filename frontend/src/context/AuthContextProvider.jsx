import React from "react";
export const AuthContext = React.createContext();
const AuthContextProvider = ({ children }) => {
	const [user, setUser] = React.useState(null);
	const [isAuth, setAuth] = React.useState(false);
	const [name, setName] = React.useState("");
	const toggleAuth = () => {
		setAuth(!isAuth);
	};
	return (
		<AuthContext.Provider value={{ user, setUser, isAuth, toggleAuth,name,setName }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
