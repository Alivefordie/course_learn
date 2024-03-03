import React, { useEffect, useState } from "react";
import "../App.css";
import { Container } from "react-bootstrap";

export default function PasswordStrength({ password, setStrength, Strength }) {
	const strength = Object.values(Strength).reduce((a, item) => a + item, 0);
	const feedback = {
		1: "Password is to weak!",
		2: "It's still weak! ",
		3: "Good!",
		4: "Great!! now your password is strong",
	}[strength];

	const validatePassword = (password) => {
		if (password.match(/\d+/g)) {
			setStrength((o) => ({ ...o, hasNumber: true }));
		} else {
			setStrength((o) => ({ ...o, hasNumber: false }));
		}

		if (password.match(/[A-Z]+/g)) {
			setStrength((validate) => ({ ...validate, hasCap: true }));
		} else {
			setStrength((validate) => ({ ...validate, hasCap: false }));
		}

		if (password.match(/[a-z]+/g)) {
			setStrength((validate) => ({ ...validate, hasLow: true }));
		} else {
			setStrength((validate) => ({ ...validate, hasLow: false }));
		}

		if (password.length > 7) {
			setStrength((o) => ({ ...o, has8digit: true }));
		} else {
			setStrength((o) => ({ ...o, has8digit: false }));
		}
	};

	useEffect(() => {
		validatePassword(password);
	}, [password]);

	return (
		<>
			<br />
			{strength > 0 ? (
				<progress
					hidden={password.length === 0}
					className={`password strength-${strength}`}
					value={strength}
					max="4"
				/>
			) : null}
			<br />
			<div className={`feedback strength-${strength}`} hidden={password.length === 0}>
				<h1 className="feedback">{feedback}</h1>
			</div>
		</>
	);
}
