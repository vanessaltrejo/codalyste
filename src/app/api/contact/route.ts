import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, company, website, service, investment } = data;

    // Log the received lead to the console
    console.log("=== NEW LEAD RECEIVED ===");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Company: ${company || "Not specified"}`);
    console.log(`Website: ${website || "Not specified"}`);
    console.log(`Service: ${service}`);
    console.log(`Investment: ${investment}`);
    console.log("=========================");

    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'codalyste@gmail.com';

    // If API Key is not set or is the default, log warning but simulate success to keep frontend working smoothly
    if (!resendApiKey || resendApiKey.includes("reemplaza_con")) {
      console.warn("⚠️ RESEND_API_KEY is not set or still default in .env.local. Skipping real email sending.");
      return NextResponse.json({ 
        success: true, 
        message: "Lead received and saved to Firestore. Real email skipped (RESEND_API_KEY missing in .env.local)." 
      }, { status: 200 });
    }

    // Initialize Resend with the secure API key
    const resend = new Resend(resendApiKey);

    // Create a gorgeous HTML template for the notification email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Lead - Codalyste</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #fafafa;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            border: 1px solid #f0f0f0;
          }
          .header {
            background: linear-gradient(135deg, #09090b 0%, #18181b 100%);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 3px solid #3b82f6;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .header p {
            color: #a1a1aa;
            margin: 8px 0 0 0;
            font-size: 14px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          .content {
            padding: 40px 30px;
          }
          .lead-greeting {
            font-size: 18px;
            color: #18181b;
            margin-top: 0;
            margin-bottom: 24px;
            font-weight: 600;
          }
          .lead-greeting span {
            color: #3b82f6;
          }
          .grid {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          .grid td {
            padding: 14px 0;
            border-bottom: 1px solid #f4f4f5;
            vertical-align: top;
          }
          .grid td.label {
            width: 30%;
            font-weight: 600;
            color: #71717a;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .grid td.value {
            color: #18181b;
            font-size: 15px;
            line-height: 1.5;
          }
          .badge {
            display: inline-block;
            background-color: #eff6ff;
            color: #1d4ed8;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 500;
          }
          .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #f1f5f9;
          }
          .footer p {
            color: #94a3b8;
            font-size: 12px;
            margin: 0;
            line-height: 1.5;
          }
          .button {
            display: inline-block;
            background-color: #09090b;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            margin-top: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CODALYSTE</h1>
            <p>Aceleradora Digital</p>
          </div>
          <div class="content">
            <h2 class="lead-greeting">¡Felicidades! Tienes un <span>nuevo prospecto</span> interesado:</h2>
            <table class="grid">
              <tr>
                <td class="label">Nombre</td>
                <td class="value" style="font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td class="label">Email</td>
                <td class="value"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td class="label">Teléfono</td>
                <td class="value"><a href="tel:${phone.replace(/\s+/g, '')}" style="color: #18181b; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <td class="label">Empresa</td>
                <td class="value">${company || '<span style="color: #a1a1aa; font-style: italic;">No especificado</span>'}</td>
              </tr>
              <tr>
                <td class="label">Sitio Web</td>
                <td class="value">${website ? `<a href="${website.startsWith('http') ? website : `https://${website}`}" target="_blank" style="color: #3b82f6; text-decoration: none;">${website}</a>` : '<span style="color: #a1a1aa; font-style: italic;">No especificado</span>'}</td>
              </tr>
              <tr>
                <td class="label">Servicios</td>
                <td class="value"><span class="badge">${service}</span></td>
              </tr>
              <tr>
                <td class="label">Inversión</td>
                <td class="value" style="color: #16a34a; font-weight: 600;">${investment}</td>
              </tr>
            </table>
            
            <div style="text-align: center; margin-top: 10px;">
              <a href="https://console.firebase.google.com/" target="_blank" class="button">Ver en Firebase Console</a>
            </div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Codalyste. Todos los derechos reservados.<br>
            Este es un correo automático generado por el formulario de contacto de codalyste.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email using Resend
    // By default on Resend's free tier without a verified domain, emails must be sent from "onboarding@resend.dev"
    // and can only be sent to the email address you used to register on Resend.
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: 'Codalyste Leads <onboarding@resend.dev>',
      to: receiverEmail,
      subject: `⚡️ Nuevo Lead: ${name} - ${company || 'Codalyste'}`,
      html: htmlContent,
      replyTo: email, // This allows you to click "Reply" in your email client to email the lead directly!
    });

    if (resendError) {
      console.error("Resend API Error:", resendError);
      return NextResponse.json({ success: false, error: resendError.message }, { status: 500 });
    }

    console.log("📨 Email enviado con éxito vía Resend! ID:", resendData?.id);
    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("Failed to process contact submission:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to process request" }, { status: 500 });
  }
}
