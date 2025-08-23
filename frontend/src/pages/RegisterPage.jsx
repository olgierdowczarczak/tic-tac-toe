import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function RegisterPage() {
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
            const res = await api.post("/api/users/register", formData);
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (err) {
            const message =
                err.response?.data?.error || err.message || "Registration failed";
            setError(message);
        }
    };

    return (
        <>
            <h1>Register page</h1>
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

                <button type="submit">Register</button>
            </form>
        </>
    );
}

export default RegisterPage;
