import { Navigate } from "react-router-dom";

interface ProtectedProps {
	isLoggedIn: boolean
	children: JSX.Element
}

const Protected = ({ isLoggedIn, children }: ProtectedProps) => {
	if (isLoggedIn) {
		return children;
	}
	return <Navigate to="/login" replace />;
};
export default Protected;