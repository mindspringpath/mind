import 'server-only'
import nodemailer from 'nodemailer'

/**
 * Australian Spam Act 2003 compliance footer
 * Automatically appended to all emails.
 */
export const emailFooter = `
  <br/><br/>
  <hr style="border:none;border-top:1px solid #ddd;margin:20px 0;" />
  <p style="font-size: 12px; color: #888; line-height: 1.5;">
    You received this email because your address was provided when booking 
    or managing a session with MindSpring Path.
    <br/>
    If you believe this was sent in error, please disregard it 
    or contact us at info@mindspringpath.com.au.
  </p>
`

/**
 * Validate required SMTP environment variables
 */
function validateEnv() {
  const required = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS'
  ]

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
  }
}

/**
 * Create reusable transporter (recommended for performance)
 */
function createTransporter() {
  validateEnv()

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

/**
 * Send transactional email
 */
export async function sendEmail({
  to,
  subject,
  html
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    const transporter = createTransporter()

    const info = await transporter.sendMail({
      from: `"MindSpring Path" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: html + emailFooter
    })

    return {
      success: true,
      messageId: info.messageId
    }
  } catch (error: any) {
    console.error('Email sending failed:', error)
    return {
      success: false,
      error: error?.message || 'Email failed'
    }
  }
}
