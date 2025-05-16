const email = async (to, subject, message) => {
  const { Resend } = await import("resend");
  const key = process.env.EMAIL_API;
  const resend = new Resend(key);
  await resend.emails.send({
    from: " onboarding@funaabworld.dev",
    to: [to],
    subject: subject,
    html: message,
  });
};
module.exports = { email };
