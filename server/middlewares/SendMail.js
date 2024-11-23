import { createTransport } from "nodemailer";

const sendMail = async (email, subject, text) => {
  try {
    const transport = createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify connection configuration
    await transport.verify();
    console.log(`SMTP connection established successfully`);

    const mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject,
      text,
    };

    const info = await transport.sendMail(mailOptions);
    console.log("Email sent successfully", info.messageId);
  } catch (error) {
    console.log("Failed to send email", error);
  }
};

export default sendMail;
