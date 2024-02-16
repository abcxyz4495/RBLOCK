import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const response = await axios.get("/auth/refresh", {
			withCredentials: true,
		});
		console.log("Response", response);
		setAuth((prev) => {
			console.log(
				"Auth",
				JSON.stringify(prev),
				response.data.accessToken
			);
			return { ...prev, accessToken: response.data.accessToken };
		});
		
		return response.data.accessToken;
	};
	
	return refresh;
};

export default useRefreshToken;
