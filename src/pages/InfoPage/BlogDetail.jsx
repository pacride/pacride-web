import { useParams, Navigate, Link } from "react-router-dom";
import InfoPage from "./index";
import { blogPosts } from "../../data/blogPosts";
import { FaCalendar, FaUser, FaArrowLeft } from "react-icons/fa6";

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <InfoPage title={post.title}>
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <Link 
            to="/blog" 
            style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.5rem", 
                marginBottom: "2rem", 
                color: "var(--primary-color)", 
                textDecoration: "none",
                fontWeight: "500"
            }}
        >
            <FaArrowLeft /> Back to Blog
        </Link>
        
        <div style={{ 
            display: "flex", 
            gap: "1.5rem", 
            marginBottom: "2rem", 
            color: "#64748b",
            fontSize: "0.95rem" 
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaCalendar /> {post.date}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaUser /> {post.author}
          </span>
        </div>
        
        <div 
            className="blog-content"
            style={{ 
                lineHeight: "1.8", 
                color: "#334155",
                fontSize: "1.1rem" 
            }}
            dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </InfoPage>
  );
};

export default BlogDetail;
