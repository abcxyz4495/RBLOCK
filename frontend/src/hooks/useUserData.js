import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useUserData = () => {
	const { setUserDataBlocks } = useAuth();
	const axiosPrivate = useAxiosPrivate();

	const userData = async (userid) => {
		const response = await axiosPrivate.get(
			`/user/details?userid=${userid}`
		);
		// console.log("Response", response);
		setUserDataBlocks((prev) => {
			console.log(
				"User",
				JSON.stringify(prev),
				response.data.userData.blocks
			);
			return response.data.userData.blocks;
		});

		return response.data.userData.blocks;
	};

	return userData;
};

export default useUserData;
