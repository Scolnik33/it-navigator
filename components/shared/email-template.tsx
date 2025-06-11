import React from "react";

const EmailTemplate = ({ name, code }: { name: string; code: string }) => (
  <div
    style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f4f4f4",
      padding: "30px",
    }}
  >
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ color: "#222222", fontSize: "22px", marginBottom: "16px" }}>
        Здравствуйте{ name ? `, ${name}` : "" }!
      </h2>

      <p style={{ fontSize: "16px", color: "#333", marginBottom: "20px" }}>
        Для подтверждения ваших учетных данных используйте код:
      </p>

      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#005BFF",
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        {code}
      </div>

      <p style={{ fontSize: "14px", color: "#666", marginTop: "30px" }}>
        Никому не сообщайте этот код — даже если вас об этом попросят.
      </p>

      <p style={{ fontSize: "12px", color: "#999", marginTop: "40px" }}>
        Если вы не запрашивали регистрацию, просто проигнорируйте это письмо.
      </p>
    </div>
  </div>
);

export default EmailTemplate;
