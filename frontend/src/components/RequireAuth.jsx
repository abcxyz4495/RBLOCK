import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
	const { auth } = useAuth();
	const location = useLocation();

	return auth?.accessToken ? (
		<Outlet />
	) : auth?.accessToken ? (
		<Navigate to={"/NotFound"} state={{ from: location }} replace />
	) : (
		<Navigate to={"/login"} state={{ from: location }} replace />
	);
};

export default RequireAuth;
