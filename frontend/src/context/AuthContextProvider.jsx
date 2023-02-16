import React from "react";
export const AuthContext = React.createContext();
const AuthContextProvider = ({ children }) => {
	const [user, setUser] = React.useState(null);
	const [isAuth, setAuth] = React.useState(false);
	const toggleAuth = () => {
		setAuth(!isAuth);
	};
	return (
		<AuthContext.Provider value={{ user, setUser, isAuth, toggleAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
