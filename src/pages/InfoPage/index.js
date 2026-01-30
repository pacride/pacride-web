import "./InfoPage.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const InfoPage = ({ title, content, children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} | Pacride`;
  }, [pathname, title]);

  return (
    <div className="info-page-layout">
      <div className="info-page">
        <div className="info-page__container">
          <h1 className="info-page__title">{title}</h1>
          <div className="info-page__content">
            {children || content || (
              <p>This is the {title} page. Content is coming soon.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfoPage;
