import type { Language } from "../context/contextStore";
import { supabase } from "./supabase";

export type BookingEmailPayload = {
  name: string;
  phone: string;
  email: string;
  vehicle_type: string;
  selected_service: string;
  preferred_date: string;
  preferred_time: string;
  registration_number: string | null;
  price_text: string;
  dropoff_time: string;
  pickup_time: string;
  message: string | null;
  source: "website";
  language: Language;
};

const enrichFunctionError = async (error: unknown) => {
  const functionError = error as { message?: string; context?: Response };

  if (!functionError.context) {
    return error;
  }

  const responseBody = await functionError.context
    .clone()
    .text()
    .catch(() => "");

  if (!responseBody) {
    return error;
  }

  let details = responseBody;
  try {
    details = JSON.stringify(JSON.parse(responseBody));
  } catch {
    // Keep the raw response text when the function returns non-JSON.
  }

  return new Error(`${functionError.message ?? "Edge Function failed"}: ${details}`);
};

export const sendBookingEmail = async (payload: BookingEmailPayload) => {
  if (!supabase) {
    return { error: new Error("Supabase is not configured") };
  }

  try {
    console.info("[booking-email] Invoking send-booking-email", {
      service: payload.selected_service,
      preferred_date: payload.preferred_date
    });

    const { data, error } = await supabase.functions.invoke("send-booking-email", {
      body: payload
    });

    if (error) {
      const enrichedError = await enrichFunctionError(error);
      console.error("[booking-email] Edge Function returned an error", enrichedError);
      return { data, error: enrichedError };
    } else {
      console.info("[booking-email] Edge Function response", data);
    }

    return { data, error };
  } catch (error) {
    console.error("[booking-email] Edge Function invocation failed", error);
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }
};
