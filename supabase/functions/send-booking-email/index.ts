import "jsr:@supabase/functions-js/edge-runtime.d.ts";

type BookingEmailPayload = {
  name?: string;
  phone?: string;
  email?: string;
  vehicle_type?: string;
  selected_service?: string;
  preferred_date?: string;
  preferred_time?: string;
  registration_number?: string | null;
  price_text?: string;
  dropoff_time?: string;
  pickup_time?: string;
  message?: string | null;
  source?: string;
  language?: "sv" | "en";
};

const recipients = ["nidaldarwishe@gmail.com", "info@vikingscarcare.com"];
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const fromEmail = Deno.env.get("BOOKING_EMAIL_FROM") ?? "Vikings Car Care <bookings@vikingscarcare.com>";
const siteUrl = Deno.env.get("SITE_URL") ?? "https://vikingscarcare.vercel.app";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
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

const response = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return response({ error: "Method not allowed" }, 405);
  }

  if (!resendApiKey) {
    return response({ error: "RESEND_API_KEY is not configured" }, 500);
  }

  let payload: BookingEmailPayload;
  try {
    payload = await req.json();
  } catch {
    return response({ error: "Invalid JSON body" }, 400);
  }

  const requiredFields: (keyof BookingEmailPayload)[] = [
    "name",
    "phone",
    "email",
    "vehicle_type",
    "selected_service",
    "preferred_date",
    "preferred_time"
  ];

  const missingFields = requiredFields.filter((field) => !requireText(payload, field));
  if (missingFields.length > 0) {
    return response({ error: "Missing booking fields", fields: missingFields }, 400);
  }

  const email = requireText(payload, "email");
  if (!email.includes("@")) {
    return response({ error: "Invalid customer email" }, 400);
  }

  const language = payload.language === "en" ? "en" : "sv";
  const labels =
    language === "en"
      ? {
          subject: "New booking request",
          title: "New booking request",
          service: "Service",
          price: "Price",
          date: "Date",
          dropoff: "Drop-off",
          pickup: "Pick-up",
          name: "Name",
          phone: "Phone",
          email: "Email",
          vehicle: "Vehicle",
          registration: "Registration",
          message: "Message",
          empty: "Not provided",
          admin: "Open admin panel"
        }
      : {
          subject: "Ny bokningsförfrågan",
          title: "Ny bokningsförfrågan",
          service: "Tjänst",
          price: "Pris",
          date: "Datum",
          dropoff: "Lämning",
          pickup: "Hämtning",
          name: "Namn",
          phone: "Telefon",
          email: "E-post",
          vehicle: "Fordon",
          registration: "Reg.nr",
          message: "Meddelande",
          empty: "Ej angivet",
          admin: "Öppna adminpanelen"
        };

  const rows = [
    [labels.service, requireText(payload, "selected_service")],
    [labels.price, requireText(payload, "price_text") || labels.empty],
    [labels.date, requireText(payload, "preferred_date")],
    [labels.dropoff, requireText(payload, "dropoff_time") || requireText(payload, "preferred_time")],
    [labels.pickup, requireText(payload, "pickup_time") || labels.empty],
    [labels.name, requireText(payload, "name")],
    [labels.phone, requireText(payload, "phone")],
    [labels.email, email],
    [labels.vehicle, requireText(payload, "vehicle_type")],
    [labels.registration, requireText(payload, "registration_number") || labels.empty],
    [labels.message, requireText(payload, "message") || labels.empty]
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#555;font-weight:700;width:160px;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#111;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const textRows = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const subject = `${labels.subject}: ${requireText(payload, "selected_service")} - ${requireText(payload, "preferred_date")}`;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipients,
      reply_to: email,
      subject,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;background:#f5f5f5;padding:24px;">
          <div style="max-width:680px;margin:auto;background:#fff;border-radius:18px;overflow:hidden;border:1px solid #e8e8e8;">
            <div style="background:#0A0A0A;color:#fff;padding:24px;">
              <p style="margin:0;color:#C1121F;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.16em;">Vikings Car Care</p>
              <h1 style="margin:8px 0 0;font-size:28px;line-height:1.15;">${escapeHtml(labels.title)}</h1>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              ${htmlRows}
            </table>
            <div style="padding:22px;">
              <a href="${escapeHtml(siteUrl)}/admin" style="display:inline-block;background:#C1121F;color:#fff;text-decoration:none;padding:13px 18px;border-radius:999px;font-weight:800;">
                ${escapeHtml(labels.admin)}
              </a>
            </div>
          </div>
        </div>`,
      text: `Vikings Car Care\n${labels.title}\n\n${textRows}\n\n${labels.admin}: ${siteUrl}/admin`
    })
  });

  const result = await resendResponse.json().catch(() => ({}));
  if (!resendResponse.ok) {
    return response({ error: "Email provider failed", details: result }, 502);
  }

  return response({ ok: true, id: result.id ?? null });
});
