import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useUserData from "../hooks/useUserData";

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const user = useUserData();
	const { auth, persist } = useAuth();
	const userRef = useRef();

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				const refreshToken = await refresh();
				userRef.current = jwtDecode(
					JSON.stringify(refreshToken)
				).userid;
				console.log("UserID", userRef.current);
				await user(userRef.current);
				// console.log(userData);
			} catch (err) {
				console.error(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		!auth?.accessToken && persist
			? verifyRefreshToken()
			: setIsLoading(false);

		return () => (isMounted = false);
	}, [auth?.accessToken, persist, refresh, user]);

	useEffect(() => {
		console.log(`isLoading: ${isLoading}`);
		console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
	}, [auth?.accessToken, isLoading]);

	return (
		<>
			{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}
		</>
	);
};

export default PersistLogin;
