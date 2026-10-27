import type { CSSProperties } from "react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>

      <p style={styles.message}>
        Oops! The page you are looking for does not exist
      </p>

      <Link to="/" style={styles.link}>
        ⬅️ Go Back Home
      </Link>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#fff",
  },
  title: {
    fontSize: "72px",
    marginBottom: "20px",
  },
  message: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
};
