import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await login(formData);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || err.error || "Login failed");
        }
    };

    return (
        <>
            <h1>Login page</h1>
            {error && <div style={{ color: "red" }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="username"
                    required
                />
                <br />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="password"
                    required
                />
                <br />

                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default LoginPage;
