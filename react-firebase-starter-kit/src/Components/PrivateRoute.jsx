import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, redirectIf, redirectTo, ...rest}) => {
	return (
		<Route
			{...rest}
			render={props => {
				return redirectIf ?  <Redirect to={redirectTo} /> : <Component {...props} />
			}}
		>	
		</Route>
	);
};

export default PrivateRoute;