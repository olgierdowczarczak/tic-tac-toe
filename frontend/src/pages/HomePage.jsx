import { Link } from "react-router-dom";

export default function () {
    const links = [
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
        { to: "/rooms", label: "Rooms" },
        { to: "/logout", label: "Logout" },
    ];

    return (
        <nav>
            <ul>
                {links.map(({ to, label }) => (
                    <li key={to}>
                        <Link to={to}>{label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
