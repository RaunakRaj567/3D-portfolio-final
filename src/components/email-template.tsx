import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  email,
  subject,
  message,
}) => (
  <div>
    <h1>New message from {fullName}!</h1>
    <div><strong>Email:</strong> {email}</div>
    <div><strong>Subject:</strong> {subject}</div>
    <div style={{ marginTop: "12px" }}>
      <strong>Message:</strong>
      <blockquote style={{ whiteSpace: "pre-wrap", borderLeft: "4px solid #ccc", paddingLeft: "8px", margin: "8px 0" }}>
        {message}
      </blockquote>
    </div>
  </div>
);
