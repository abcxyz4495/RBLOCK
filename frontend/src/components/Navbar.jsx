import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();
	const logout = useLogout();

	async function signOut() {
		await logout();
		navigate("/login");
	}
	return (
		<div className="w-full h-14 fixed left-0 top-0 flex justify-between items-center px-10 shadow-md z-10 bg-white">
			<button onClick={() => navigate("/")}>R-Block</button>
			<button
				onClick={signOut}
				className="bg-red-600 hover:bg-red-900 px-4 py-2 text-white rounded-md duration-75 max-[500px]:px-2"
			>
				Log Out
			</button>
		</div>
	);
}

export default Navbar;
