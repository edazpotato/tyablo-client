let loginID = "";
const headers = { "Content-Type": "application/json" };
function yeet() {
	// Send login code
	const sendCodeButton = document.getElementById("send-login-code-button");
	const phoneNumberPrefixBox = document.getElementById(
		"phone-number-prefix-box"
	);
	const phoneNumberBox = document.getElementById("phone-number-box");
	sendCodeButton.addEventListener("click", () => {
		let phoneNumber = phoneNumberBox.value.trim();
		let phoneNumberPrefix = phoneNumberPrefixBox.value.trim();
		if (phoneNumberPrefix.startsWith("+"))
			phoneNumberPrefix = phoneNumberPrefix.slice(1);
		phoneNumber = phoneNumber.replaceAll(" ", "");
		const combinedNumber = phoneNumberPrefix + phoneNumber;
		console.log("phone number", combinedNumber);
		fetch(`/sendlogincodetophonenumber`, {
			method: "POST",
			headers,
			body: JSON.stringify({ number: combinedNumber }),
		}).then((res) =>
			res.json().then((data) => {
				loginID = data.id;
			})
		);
	});

	// Verify login code
	const verifyCodeButton = document.getElementById(
		"verify-login-code-button"
	);
	const phoneLoginCodeBox = document.getElementById("login-code-box");
	const nameSignupBox = document.getElementById("signup-name-box");
	verifyCodeButton.addEventListener("click", () => {
		const code = phoneLoginCodeBox.value.trim();
		const name = nameSignupBox.value.trim();
		// if (code.length < 1) return;
		let body = {
			id: loginID,
			code,
		};
		if (name.length > 0) body.name = name;
		fetch(`/verifylogincodefromphone`, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
		}).then((res) => {
			if (res.status === 401) {
				return alert("Set the name field to create an account");
			}
			res.json().then((data) => {
				console.log(data);
			});
		});
	});
}
document.addEventListener("DOMContentLoaded", yeet);
