import { FaBriefcase } from "react-icons/fa6";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";

const CareersContent = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: "#f0f9ff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
          color: "var(--primary-color)",
          fontSize: "2rem",
        }}
      >
        <FaBriefcase />
      </div>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#1a1a1a" }}>
        No Open Positions
      </h2>
      <p
        style={{
          color: "#666",
          marginBottom: "2rem",
          maxWidth: "500px",
          lineHeight: "1.6",
        }}
      >
        We currently don't have any open roles, but we're always looking for
        talented individuals to join our community. Check back later or follow
        us on social media for updates!
      </p>
      <Link to="/contact">
        <Button>Contact Us</Button>
      </Link>
    </div>
  );
};

export default CareersContent;
