import { FaShieldHeart, FaUserCheck, FaLocationDot } from "react-icons/fa6";

const SafetyContent = () => {
  return (
    <div>
      <p style={{ fontSize: "1.2rem", marginBottom: "3rem", color: "#475569" }}>
        Your safety is our priority. We've built Pacride with features to help
        you travel with confidence.
      </p>

      <div style={{ display: "grid", gap: "3rem" }}>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div
            style={{
              minWidth: "60px",
              height: "60px",
              backgroundColor: "#eff6ff",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary-color)",
              fontSize: "1.5rem",
            }}
          >
            <FaUserCheck />
          </div>
          <div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              Verified Profiles
            </h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>
              We verify phone numbers and email addresses for every member of
              our community. Look for the verification badge on user profiles.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div
            style={{
              minWidth: "60px",
              height: "60px",
              backgroundColor: "#eff6ff",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary-color)",
              fontSize: "1.5rem",
            }}
          >
            <FaShieldHeart />
          </div>
          <div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              Community Reviews
            </h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>
              Read reviews from other members before you travel. Our rating
              system helps build trust and accountability within the community.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div
            style={{
              minWidth: "60px",
              height: "60px",
              backgroundColor: "#eff6ff",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary-color)",
              fontSize: "1.5rem",
            }}
          >
            <FaLocationDot />
          </div>
          <div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              Share Your Trip
            </h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>
              Always let a friend or family member know your travel plans. Send
              them your ride details and estimated arrival time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyContent;
