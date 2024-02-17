/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});
	// const [persist, setPersist] = useState(
	// 	JSON.parse(localStorage.getItem("persist")) || false
	// );
	const [userDataBlocks, setUserDataBlocks] = useState(null);
	console.log("User Data", userDataBlocks);

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
				// persist,
				// setPersist,
				userDataBlocks,
				setUserDataBlocks,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
