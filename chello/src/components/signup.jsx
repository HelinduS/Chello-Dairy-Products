import React, { useState } from "react";
import "../style/login.css"; 

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();

        //basic validation of passwords
        if(password !== passwordConfirm){
            setErrorMessage("Passwords do not match");
            return;
        }

        const signupData = {firstName, lastName, address, phone, email, password};
        try {
            const response = await fetch("http://localhost:8080/admin/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(signupData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            window.location.href = "/login";
        } catch (error) {
            setErrorMessage(error.message);
        }
        };

    return (
        <div className="modal">
            <div className="modal-content">
                <h1>
                    Sign Up
                </h1>
                <h6>
                    Already have an account? <a href="/login">Log in</a>.
                </h6>
                <form onSubmit={handleSubmit}>
                    <input
                        type="firstName"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <br/>
                    <input
                        type="lastName"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <br/>
                    <input
                        type="address"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <br/>
                    <input
                        type="phone"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <br/>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br/>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br/>
                    <input
                        type="passwordConfirm"
                        placeholder="Enter Password Again"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit">Sign Up</button>
                    {errorMessage && <div style={{color: "red"}}>{errorMessage}</div>}
                    <div className="extra-options">
                        <button type="button" className="cancelbtn" onClick={() => (window.location.href = "/")}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
);
};

export default Signup;