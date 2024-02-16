import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

function Home() {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const location = useLocation();
	const { auth, setUserDataBlocks, userDataBlocks } = useAuth();

	const userid = jwtDecode(JSON.stringify(auth?.accessToken)).userid;

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getData = async () => {
			try {
				// console.log("Requesting");
				const response = await axiosPrivate.get(
					`/user/details?userid=${userid}`,
					{
						signal: controller.signal,
					}
				);
				// console.log("Response Data", response.data.userData.blocks);
				isMounted && setUserDataBlocks(response.data.userData.blocks);
			} catch (err) {
				console.error(err);
				navigate("/login", {
					state: { from: location },
					replace: true,
				});
			}
		};

		getData();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [axiosPrivate, userid, location, navigate]);

	return (
		<div className="w-full h-screen">
			<div className="h-14 relative">
				<Navbar />
			</div>
			<section className="w-full px-8 py-8">
				<div className="h-64 md:h-96 w-full bg-slate-500 rounded-md shadow-2xl"></div>
			</section>
			<section className="w-full px-4 md:px-10">
				<div className="flex flex-wrap gap-5 md:gap-8 justify-center">
					{userDataBlocks &&
						userDataBlocks.map((block) => (
							<CourseCard
								key={block.name}
								name={block.name}
							/>
						))}
				</div>
			</section>
		</div>
	);
}

// eslint-disable-next-line react/prop-types
const CourseCard = ({ name }) => {
	const navigate = useNavigate();
	function handleClick() {
		navigate(`/block/${name}`);
	}
	return (
		<div
			className="w-36 h-52 rounded-md bg-slate-400 flex-shrink-0 md:h-[350px] md:w-[250px] shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 duration-200 text-white font-bold"
			onClick={handleClick}
		>
			{name}
		</div>
	);
};

export default Home;
