import { useNavigate } from "react-router-dom";

function NotFound() {
	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	return (
		<div className="h-screen w-full flex justify-center items-center flex-col gap-7">
			<div className="w-[500px] font-bold text-3xl text-center">
				404 | Page Not Found
			</div>
			<button
				onClick={goBack}
				className="font-medium border bg-slate-900 hover:bg-slate-950 px-5 py-3 rounded-lg text-white shadow-md duration-75"
			>
				Go Back
			</button>
		</div>
	);
}

export default NotFound;
