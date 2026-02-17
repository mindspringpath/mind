import 'server-only'
import nodemailer from 'nodemailer'

/**
 * Reusable footer required for Australian compliance (Spam Act 2003).
 * Automatically appended to all transactional emails.
 */
export const emailFooter = `
  <br/><br/>
  <p style="font-size: 12px; color: #888;">
    You received this email because your address was provided when booking or managing a session with MindSpring Path.
    If you believe this was sent in error, please disregard it or contact us at info@mindspringpath.com.au.
  </p>
`

export async function sendEmail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  await transporter.sendMail({
    from: `"MindSpring Path" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html: html + emailFooter   // ⭐ Footer automatically added to every email
  })
}