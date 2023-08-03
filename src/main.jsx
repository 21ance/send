import React from "react";
import ReactDOM from "react-dom/client";
import RouteManager from "./router/RouteManager";
import "./stylesheet/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouteManager />
	</React.StrictMode>
);
