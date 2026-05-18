import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend@6.12.3";

type BookingEmailPayload = {
  booking_id?: string;
  created_at?: string;
  name?: string;
  phone?: string;
  email?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  vehicle_type?: string;
  selected_service?: string;
  service?: string;
  reg_number?: string | null;
  registration_number?: string | null;
  price_text?: string;
  message?: string | null;
  source?: string;
  language?: "sv" | "en";
  logo_url?: string;
};

type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

const adminRecipients = ["nidaldarwishe@gmail.com", "info@vikingscarcare.com"];
const siteUrl = Deno.env.get("SITE_URL") ?? "https://vikingscarcare.vercel.app";
const companyPhone = Deno.env.get("COMPANY_PHONE") ?? "0455 61 61 69";
const companyEmail = Deno.env.get("COMPANY_EMAIL") ?? "info@vikingscarcare.com";
const companyAddress = Deno.env.get("COMPANY_ADDRESS") ?? "Borgmästarekajen 32, 371 34 Karlskrona";
const fallbackLogoUrl = Deno.env.get("BOOKING_LOGO_URL") ?? "";
const emailFailureMessage = "Bokningen sparades men e-postbekräftelsen kunde inte skickas automatiskt just nu.";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400"
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });

const emailFailureResponse = (requestId: string, extra: Record<string, unknown> = {}) =>
  jsonResponse({
    success: true,
    emailSent: false,
    message: emailFailureMessage,
    requestId,
    ...extra
  });

const serializeError = (error: unknown) => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    };
  }

  try {
    return JSON.parse(JSON.stringify(error));
  } catch {
    return String(error);
  }
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const requireText = (payload: BookingEmailPayload, key: keyof BookingEmailPayload) => {
  const value = payload[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : "";
};

const safeUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
};

const formatTimestamp = (isoValue: string) => {
  const date = new Date(isoValue);
  if (Number.isNaN(date.getTime())) {
    return isoValue;
  }

  return new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Stockholm"
  }).format(date);
};

const tableRows = (rows: string[][]) =>
  rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#555;font-weight:700;width:170px;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#111;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

const emailShell = ({ logoUrl, eyebrow, title, intro, children }: { logoUrl: string; eyebrow: string; title: string; intro: string; children: string }) => `
  <div style="margin:0;background:#f4f5f6;padding:24px;font-family:Inter,Arial,sans-serif;color:#111;">
    <div style="max-width:680px;margin:auto;overflow:hidden;border-radius:18px;border:1px solid #e6e6e6;background:#ffffff;">
      <div style="background:#0A0A0A;padding:24px;color:#ffffff;">
        ${
          logoUrl
            ? `<img src="${escapeHtml(logoUrl)}" alt="Vikings Car Care" width="180" style="display:block;max-width:180px;height:auto;margin-bottom:18px;border-radius:10px;" />`
            : ""
        }
        <p style="margin:0;color:#C1121F;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.16em;">${escapeHtml(eyebrow)}</p>
        <h1 style="margin:8px 0 0;font-size:28px;line-height:1.15;">${escapeHtml(title)}</h1>
        <p style="margin:12px 0 0;color:#d8d8d8;line-height:1.6;">${escapeHtml(intro)}</p>
      </div>
      ${children}
    </div>
  </div>`;

const buildAdminEmail = ({
  bookingId,
  timestamp,
  customerName,
  customerPhone,
  customerEmail,
  vehicleType,
  regNumber,
  service,
  priceText,
  message,
  logoUrl
}: {
  bookingId: string;
  timestamp: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleType: string;
  regNumber: string;
  service: string;
  priceText: string;
  message: string;
  logoUrl: string;
}): EmailContent => {
  const rows = [
    ["Boknings-ID", bookingId],
    ["Skickad", timestamp],
    ["Tjänst", service],
    ["Pris", priceText],
    ["Namn", customerName],
    ["Telefon", customerPhone],
    ["E-post", customerEmail],
    ["Fordonstyp", vehicleType],
    ["Reg.nr", regNumber],
    ["Meddelande", message]
  ];

  const subject = `Ny bokningsförfrågan: ${service} (${regNumber})`;
  const text = [
    "Vikings Car Care - Ny bokningsförfrågan",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Adminpanel: ${siteUrl}/admin`
  ].join("\n");

  const html = emailShell({
    logoUrl,
    eyebrow: "Vikings Car Care",
    title: "Ny bokningsförfrågan",
    intro: "En ny bokning har sparats i adminpanelen.",
    children: `
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        ${tableRows(rows)}
      </table>
      <div style="padding:22px;">
        <a href="${escapeHtml(siteUrl)}/admin" style="display:inline-block;background:#C1121F;color:#fff;text-decoration:none;padding:13px 18px;border-radius:999px;font-weight:800;">
          Öppna adminpanelen
        </a>
      </div>`
  });

  return { subject, html, text };
};

const buildCustomerEmail = ({
  customerName,
  vehicleType,
  regNumber,
  service,
  priceText,
  message,
  logoUrl
}: {
  customerName: string;
  vehicleType: string;
  regNumber: string;
  service: string;
  priceText: string;
  message: string;
  logoUrl: string;
}): EmailContent => {
  const rows = [
    ["Tjänst", service],
    ["Pris", priceText],
    ["Fordonstyp", vehicleType],
    ["Reg.nr", regNumber],
    ["Meddelande", message]
  ];

  const subject = "Vi har mottagit din bokningsförfrågan | Vikings Car Care";
  const text = [
    `Hej ${customerName},`,
    "",
    "Tack för din bokningsförfrågan. Vi återkommer så snart vi kan med personlig bekräftelse.",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Kontakt:",
    `Telefon: ${companyPhone}`,
    `E-post: ${companyEmail}`,
    `Adress: ${companyAddress}`
  ].join("\n");

  const html = emailShell({
    logoUrl,
    eyebrow: "Bokningsförfrågan mottagen",
    title: `Tack ${customerName}`,
    intro: "Vi har mottagit din förfrågan och återkommer med personlig bekräftelse så snart vi kan.",
    children: `
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        ${tableRows(rows)}
      </table>
      <div style="padding:22px;background:#fafafa;">
        <p style="margin:0 0 12px;font-weight:800;color:#111;">Kontakta Vikings Car Care</p>
        <p style="margin:0;line-height:1.7;color:#444;">
          Telefon: <a href="tel:+46455616169" style="color:#C1121F;font-weight:800;text-decoration:none;">${escapeHtml(companyPhone)}</a><br/>
          E-post: <a href="mailto:${escapeHtml(companyEmail)}" style="color:#C1121F;font-weight:800;text-decoration:none;">${escapeHtml(companyEmail)}</a><br/>
          Adress: ${escapeHtml(companyAddress)}
        </p>
        <a href="tel:+46455616169" style="display:inline-block;margin-top:18px;background:#C1121F;color:#fff;text-decoration:none;padding:13px 18px;border-radius:999px;font-weight:800;">
          Ring oss
        </a>
      </div>`
  });

  return { subject, html, text };
};

const sendResendEmail = async ({
  resend,
  label,
  requestId,
  from,
  to,
  replyTo,
  content
}: {
  resend: Resend;
  label: string;
  requestId: string;
  from: string;
  to: string | string[];
  replyTo: string;
  content: EmailContent;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo,
      subject: content.subject,
      html: content.html,
      text: content.text
    });

    if (error) {
      console.error("[send-booking-email] Resend SDK failed", { requestId, label, error: serializeError(error) });
      return { sent: false, id: null };
    }

    console.info("[send-booking-email] Email sent", { requestId, label, id: data?.id ?? null });
    return { sent: true, id: data?.id ?? null };
  } catch (error) {
    console.error("[send-booking-email] Resend runtime failure", { requestId, label, error: serializeError(error) });
    return { sent: false, id: null };
  }
};

Deno.serve(async (req) => {
  const requestId = crypto.randomUUID();

  try {
    console.info("[send-booking-email] Request received", { requestId, method: req.method });

    if (req.method === "OPTIONS") {
      return jsonResponse({ success: true, emailSent: false, requestId });
    }

    if (req.method !== "POST") {
      return jsonResponse({ success: false, emailSent: false, message: "Method not allowed", requestId }, 405);
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("BOOKING_EMAIL_FROM");

    if (!resendApiKey) {
      console.error("[send-booking-email] Missing RESEND_API_KEY", { requestId });
      return emailFailureResponse(requestId);
    }

    if (!fromEmail) {
      console.error("[send-booking-email] Missing BOOKING_EMAIL_FROM", { requestId });
      return emailFailureResponse(requestId);
    }

    let payload: BookingEmailPayload;
    try {
      payload = await req.json();
    } catch (error) {
      console.error("[send-booking-email] Invalid JSON body", { requestId, error: serializeError(error) });
      return emailFailureResponse(requestId);
    }

    const bookingId = requireText(payload, "booking_id") || requestId;
    const timestamp = formatTimestamp(requireText(payload, "created_at") || new Date().toISOString());
    const customerName = requireText(payload, "name") || requireText(payload, "customer_name");
    const customerPhone = requireText(payload, "phone") || requireText(payload, "customer_phone");
    const customerEmail = requireText(payload, "email") || requireText(payload, "customer_email");
    const service = requireText(payload, "selected_service") || requireText(payload, "service");
    const vehicleType = requireText(payload, "vehicle_type");
    const regNumber = (requireText(payload, "reg_number") || requireText(payload, "registration_number")).toUpperCase();
    const priceText = requireText(payload, "price_text") || "Ej angivet";
    const message = requireText(payload, "message") || "Inget meddelande";
    const logoUrl = safeUrl(requireText(payload, "logo_url")) || safeUrl(fallbackLogoUrl);

    const missingFields = [
      ["booking_id", bookingId],
      ["name", customerName],
      ["phone", customerPhone],
      ["email", customerEmail],
      ["vehicle_type", vehicleType],
      ["reg_number", regNumber],
      ["service", service]
    ]
      .filter(([, value]) => !value)
      .map(([field]) => field);

    if (missingFields.length > 0) {
      console.error("[send-booking-email] Missing booking fields", { requestId, missingFields });
      return emailFailureResponse(requestId);
    }

    if (!customerEmail.includes("@")) {
      console.error("[send-booking-email] Invalid customer email", { requestId });
      return emailFailureResponse(requestId);
    }

    const resend = new Resend(resendApiKey);
    const adminEmail = buildAdminEmail({
      bookingId,
      timestamp,
      customerName,
      customerPhone,
      customerEmail,
      vehicleType,
      regNumber,
      service,
      priceText,
      message,
      logoUrl
    });
    const customerEmailContent = buildCustomerEmail({
      customerName,
      vehicleType,
      regNumber,
      service,
      priceText,
      message,
      logoUrl
    });

    const [adminResult, customerResult] = await Promise.all([
      sendResendEmail({
        resend,
        label: "admin",
        requestId,
        from: fromEmail,
        to: adminRecipients,
        replyTo: customerEmail,
        content: adminEmail
      }),
      sendResendEmail({
        resend,
        label: "customer",
        requestId,
        from: fromEmail,
        to: customerEmail,
        replyTo: companyEmail,
        content: customerEmailContent
      })
    ]);

    const emailSent = adminResult.sent && customerResult.sent;
    if (!emailSent) {
      return emailFailureResponse(requestId, {
        adminEmailSent: adminResult.sent,
        customerEmailSent: customerResult.sent
      });
    }

    return jsonResponse({
      success: true,
      emailSent: true,
      adminEmailId: adminResult.id,
      customerEmailId: customerResult.id,
      requestId
    });
  } catch (error) {
    console.error("[send-booking-email] Unexpected runtime error", { requestId, error: serializeError(error) });
    return emailFailureResponse(requestId);
  }
});
