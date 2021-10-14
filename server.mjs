import path, { dirname } from "path";

import express from "express";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const apiRoot = "https://ty.alles.cx/api/v1";
const staticFilesRoot = "https://ty.alles.cx/s";
const userFilesRoot = "https://ty.alles.cx/fs";

const headers = { "Content-Type": "application/json" };

app.all("/sendlogincodetophonenumber", async (req, res) => {
	const phone = req.body.number;
	console.log(req.body);
	const body = JSON.stringify({ number: phone });
	try {
		const res2 = await fetch(`${apiRoot}/login/phone`, {
			method: "POST",
			headers,
			body,
		});
		// console.log(res2);
		try {
			const data = await res2.json();
			res.send(JSON.stringify(data));
		} catch (e) {
			console;
			res.status(420).send(e);
		}
	} catch (e) {
		console.log(e);
		res.status(418).send(e.toString());
	}
});

app.all("/verifylogincodefromphone", async (req, res) => {
	const body = req.body;
	console.log(req.body);
	try {
		const res2 = await fetch(`${apiRoot}/login/code`, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
		});
		console.log(res2);
		if (res2.statusCode === 401) {
			return res.status(401).send("Send req again with name");
		}
		try {
			const data = await res2.json();
			res.send(JSON.stringify(data));
		} catch (e) {
			console;
			res.status(420).send(e);
		}
	} catch (e) {
		console.log(e);
		res.status(418).send(e.toString());
	}
});

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(80, () => console.log("Server is listening on port 80!"));
