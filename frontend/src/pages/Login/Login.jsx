/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Login() {
	console.log("Hello");
	const { setAuth, persist, setPersist, setUserDataBlocks } = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();

	const { register, handleSubmit, reset } = useForm();

	const from = location.state?.from?.pathname || "/";

	async function handlerUserLogin(data) {
		const userid = data.userid;
		const password = data.password;
		console.log({ userid, password });
		try {
			const response = await axios.post(
				"/auth/login",
				JSON.stringify({
					userid,
					password,
				}),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			const accessToken = response?.data?.accessToken;
			setAuth({ accessToken });

			const user = jwtDecode(JSON.stringify(accessToken)).userid;

			const res = await axiosPrivate.get(
				`/user/details?userid=${userid}`
			);
			// console.log("Response", response);
			setUserDataBlocks((prev) => {
				console.log(
					"User",
					JSON.stringify(prev),
					res.data.userData.blocks
				);
				return res.data.userData.blocks;
			});

			reset();
			navigate(from, { replace: true });
		} catch (error) {
			if (!error?.response) console.log("No server response");
			else if (error.response?.status === 400) {
				console.log(error.message);
				console.log("Missing userid or password");
			} else if (error.response?.status === 401)
				console.log("Unauthorized");
			else console.log("Login Failed");
		}
	}

	function togglePersist() {
		setPersist((prev) => !prev);
	}

	useEffect(() => {
		setPersist(true);
		localStorage.setItem("persist", persist);
	}, [persist, setPersist]);

	return (
		<div className="w-full h-screen flex">
			<div className="h-full w-2/4 max-[1100px]:w-full">
				<div className="w-full h-full flex justify-center items-center">
					<div className="max-w-[600px] min-w-[300px]">
						<div className="p-8">
							<h1 className="text-gray-600 text-md font-semibold pb-[50px]"></h1>
							<h2 className="font-bold text-3xl pb-1">Sign In</h2>
							<p className="text-gray-600 pb-10">
								Enter your userid to get started
							</p>
							<br />
							<form onSubmit={handleSubmit(handlerUserLogin)}>
								<label
									htmlFor="text"
									className="text-gray-600 mb-2"
								>
									User ID
								</label>
								<input
									type="text"
									{...register("userid")}
									placeholder="Your User ID"
									className="w-full border h-10 rounded-lg p-4 mb-4"
									autoComplete="false"
									required
								/>
								<label
									htmlFor="password"
									className="text-gray-600"
								>
									Your Password
								</label>
								<input
									type="password"
									{...register("password", { minLength: 8 })}
									placeholder="Your password"
									className="w-full border h-10 rounded-lg p-4 mb-6"
									autoComplete="false"
									required
								/>
								<button
									className="w-full border h-[40px] rounded-lg text-white bg-slate-900 font-bold shadow-md hover:bg-slate-950 duration-75"
									type="submit"
								>
									Sign In
								</button>
							</form>
							{/* <div className="text-center"></div> */}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-green-500 h-full w-2/4 max-[1100px]:hidden"></div>
		</div>
	);
}

export default Login;
