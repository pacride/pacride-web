import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const faqs = [
  {
    question: "How do I book a ride?",
    answer:
      "Booking a ride is simple! Just search for your destination on the home page, select a ride that fits your schedule, and click 'Connect' to get in touch with the driver.",
  },
  {
    question: "Is Pacride safe?",
    answer:
      "Safety is our top priority. We verify all phone numbers and allow users to review each other. We also recommend meeting in public places and sharing your trip details with a friend.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Drivers set their own prices based on fuel costs and vehicle maintenance. The price is fixed when you book, so there are no surprises.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel your booking. However, we ask that you inform the driver as soon as possible out of courtesy.",
  },
  {
    question: "How do I become a driver?",
    answer:
      "To become a driver, simply create an account, verify your details, and click on 'List a ride'. You'll need to provide your vehicle information.",
  },
];

const HelpContent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ marginBottom: "2rem" }}>
        Find answers to frequently asked questions about using Pacride.
      </p>
      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <button
            onClick={() => toggleAccordion(index)}
            style={{
              width: "100%",
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#1a1a1a",
            }}
          >
            {faq.question}
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openIndex === index && (
            <div
              style={{
                padding: "0 1.5rem 1.5rem",
                color: "#475569",
                lineHeight: "1.6",
                borderTop: "1px solid #f1f5f9",
                paddingTop: "1rem",
              }}
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HelpContent;
