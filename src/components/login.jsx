import React, { useState } from "react";
import "../style/login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = { email, password };
        let loginUrl = email.endsWith("@admin.chello.com")
            ? "http://localhost:8080/admin/login"
            : "http://localhost:8080/login/log";
        try {
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            if (data.role === "admin") {
                window.location.href = "/dashboard";
            } else {
                window.location.href = "/index1";
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h1>Login</h1>
                <h6>
                    Create an account? <a href="/signup">Sign Up</a>.
                </h6>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit">Login</button>
                    <label>
                        <input type="checkbox" name="remember" /> Remember me
                    </label>
                    {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                    <div className="extra-options">
                        <button
                            type="button"
                            className="cancelbtn"
                            onClick={() => (window.location.href = "/")}
                        >
                            Cancel
                        </button>
                        <span className={"psw"}>
                            <a href={"#"}>Forgot Password?</a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;