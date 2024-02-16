function SessionList({ block, setSelectItem, selectedItem }) {
	// console.log(block);
	return (
		<div className="pt-10 px-6">
			<h1 className="text-black font-bold text-2xl">
				{block && block.name} Sessions
			</h1>
			<ul className="my-4 text-center flex flex-col gap-2">
				{block &&
					block?.sessions?.map((each) => (
						<li
							key={each.name}
							onClick={() => setSelectItem(each)}
							className={`px-8 py-2 text-lg rounded-md cursor-pointer ${
								selectedItem?.name === each.name
									? "bg-slate-700 text-white"
									: "hover:bg-slate-300"
							}`}
						>
							{each.name}
						</li>
					))}
			</ul>
		</div>
	);
}

export default SessionList;
