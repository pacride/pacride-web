import { FaCalendar, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { blogPosts } from "../../../data/blogPosts";

const BlogContent = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {blogPosts.map((post) => (
        <article
          key={post.id}
          style={{
            padding: "2rem",
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            transition: "all 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              color: "#64748b",
            }}
          >
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <FaCalendar /> {post.date}
            </span>
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <FaUser /> {post.author}
            </span>
          </div>
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "1rem",
              color: "#1a1a1a",
            }}
          >
            {post.title}
          </h2>
          <p style={{ color: "#475569", lineHeight: "1.6" }}>{post.excerpt}</p>
          <Link
            to={`/blog/${post.id}`}
            style={{
              marginTop: "1.5rem",
              display: "inline-block",
              color: "var(--primary-color)",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Read more →
          </Link>
        </article>
      ))}
    </div>
  );
};

export default BlogContent;
