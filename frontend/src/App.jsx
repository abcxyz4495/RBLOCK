import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Session from "./pages/Session/Session";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />

				{/* <Route element={<PersistLogin />}> */}
					<Route element={<RequireAuth />}>
						<Route path="/" element={<Home />} />
					</Route>

					<Route element={<RequireAuth />}>
						<Route path="/block/:blockName" element={<Session />} />
					</Route>
				{/* </Route> */}

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
