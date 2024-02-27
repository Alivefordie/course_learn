// auth.js
import React, { useEffect } from "react";
import { useSetState } from "react-use";
import conf from "../conf/main";
import ax, { axData } from "../conf/ax";

export const AuthContext = React.createContext(null);

const initialState = {
	isLoggedIn: false,
	user: null,
	isLoginPending: false,
	loginError: null,
	role: "",
};

const updateJwt = (jwt) => {
	axData.jwt = jwt;
	if (jwt) {
		sessionStorage.setItem(conf.jwtSessionStorageKey, jwt);
	} else {
		sessionStorage.removeItem(conf.jwtSessionStorageKey);
	}
};

export const ContextProvider = (props) => {
	const [state, setState] = useSetState(initialState);

	const setLoginPending = (isLoginPending) => setState({ isLoginPending });
	const setLoginSuccess = (isLoggedIn, user) => setState({ isLoggedIn, user });
	const setLoginError = (loginError) => setState({ loginError });
	const setRole = (role) => setState({ role });

	const handleLoginResult = (error, result) => {
		setLoginPending(false);

		if (result && result.user) {
			if (result.jwt) {
				updateJwt(result.jwt);
			}
			setLoginSuccess(true, result.user);
		} else if (error) {
			setLoginError(error);
		}
	};

	useEffect(() => {
		setLoginPending(true);
		loadPersistedJwt(handleLoginResult);
	}, []);

	const login = (username, password) => {
		setLoginPending(true);
		setLoginSuccess(false);
		setLoginError(null);

		fetchLogin(username, password, handleLoginResult, setRole);
	};

	const logout = () => {
		setLoginPending(false);
		updateJwt(null);
		setLoginSuccess(false);
		setLoginError(null);
		setRole("");
		sessionStorage.setItem("userRole", "");
	};

	return (
		<AuthContext.Provider
			value={{
				state,
				login,
				logout,
				setRole,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

const fetchLogin = async (username, password, callback, setRole) => {
	try {
		const response = await ax.post(conf.loginEndpoint, {
			identifier: username,
			password,
		});
		if (response.data.jwt && response.data.user.id > 0) {
			callback(null, response.data);
			const roleResponse = await ax.get(conf.RoleSessionStorageKey);
			const role = roleResponse.data.role.name;
			console.log(role);
			setRole(role);
			sessionStorage.setItem("userRole", role);
		} else {
			callback(new Error("Invalid username and password"));
		}
	} catch (e) {
		callback(new Error("Failed to initiate login"));
	}
};

const loadPersistedJwt = async (callback) => {
	try {
		const persistedJwt = sessionStorage.getItem(conf.jwtSessionStorageKey);
		if (persistedJwt) {
			axData.jwt = persistedJwt;
			const response = await ax.get(conf.jwtUserEndpoint);
			if (response.data.id > 0) {
				callback(null, { user: response.data });
			} else {
				callback(null);
			}
		}
	} catch (e) {
		console.log(e);
		callback(new Error("Fail to initiate auto login"));
	}
};
