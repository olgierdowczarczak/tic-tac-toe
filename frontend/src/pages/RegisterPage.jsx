import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import connectPlayer from "../helpers/connectPlayer";

export default function () {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const data = await register(formData);
            connectPlayer(data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || err.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const inputs = [
        { type: "text", name: "username", placeholder: "Username" },
        { type: "password", name: "password", placeholder: "Password" },
    ];

    return (
        <div>
            <h1>Register</h1>

            {error && <div style={{ color: "red" }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                {inputs.map(({ type, name, placeholder }) => (
                    <div key={name}>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            required
                        />
                    </div>
                ))}

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}
