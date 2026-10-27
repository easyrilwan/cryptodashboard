import { Link } from "react-router";

export default function Header() {
  return (
    <div className="top-nav">
      <Link to="/">Home</Link>

      <Link to="/about">About</Link>
    </div>
  );
}
