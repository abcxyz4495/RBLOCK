import { IoReorderThreeOutline, IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import Navbar from "../../components/Navbar";
import SessionList from "../../components/SessionList";
import useAuth from "../../hooks/useAuth";

function Session() {
	const { userDataBlocks } = useAuth();
	const { blockName } = useParams();

	// console.log(userDataBlocks);
	// console.log(blockName);

	const [block, setBlock] = useState(null);

	useEffect(() => {
		userDataBlocks?.forEach((each) => {
			if (blockName === each.name) {
				setBlock(each);
				console.log("Each", each);
			}
		});
	}, [blockName, userDataBlocks]);

	const [selectedItem, setSelectItem] = useState(null);
	// console.log(selectedItem);

	const [sidebarOpen, setSidebarOpen] = useState(true);

	const [showNotes, setShowNotes] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};

	return (
		<div className="flex h-screen flex-col relative">
			<div className="h-14 relative">
				<Navbar />
			</div>

			<div className="flex flex-1 overflow-y-auto">
				<div
					className={`bg-slate-100 sidebar duration-150 relative
					 ${sidebarOpen ? "w-[300px]" : "w-0"}`}
				>
					{sidebarOpen ? (
						<button
							className="absolute top-0 right-0 px-4 py-2 rounded text-black"
							onClick={toggleSidebar}
						>
							<IoCloseOutline size={30} />
						</button>
					) : (
						<button
							className="absolute top-0 px-4 py-2 rounded text-black"
							onClick={toggleSidebar}
						>
							<IoReorderThreeOutline size={30} />
						</button>
					)}
					{sidebarOpen && (
						<SessionList
							block={block}
							setSelectItem={setSelectItem}
							selectedItem={selectedItem}
						/>
					)}
				</div>

				<div className="w-full flex justify-center items-center gap-10">
					<div className="flex justify-center items-center flex-col gap-4">
						{selectedItem && (
							<>
								<ReactPlayer
									url={selectedItem.videoURL}
									className="w-[300px] h-[250px]"
									volume={1}
									controls={true}
									config={{
										file: {
											attributes: {
												controlsList: "nodownload",
												disablePictureInPicture: true,
											},
										},
									}}
								></ReactPlayer>
								<button
									className="bg-slate-900 text-white px-7 py-2 rounded-md"
									onClick={() =>
										setShowNotes((prev) => !prev)
									}
								>
									Notes
								</button>
							</>
						)}
					</div>

					{selectedItem && (
						<iframe
							src={selectedItem.pdfURL + "#toolbar=0"}
							width={450}
							height={634}
							className={`bg-slate-950 ${
								showNotes ? "block" : "hidden"
							}`}
						></iframe>
					)}
				</div>
			</div>
		</div>
	);
}

export default Session;
