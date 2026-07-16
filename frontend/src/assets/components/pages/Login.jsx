import { useState } from "react";
import api from "../../../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await api.post("/users/login", {
                email,
                password,
            });

            console.log(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div className="login-page">
            <div className="login-card">

                <h1>Student Management</h1>

                <p>Login to continue</p>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />

                <button onClick={handleLogin}>
                    Login
                </button>

                <p>Don't have an account?</p>

            </div>
        </div>
    );
}

export default Login;