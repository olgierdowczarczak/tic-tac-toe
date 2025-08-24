import { Link } from "react-router-dom";

function HomePage() {
    return (
        <>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Register</Link>
            <br />
            <Link to="/rooms">Rooms</Link>
        </>
    );
}

export default HomePage;
