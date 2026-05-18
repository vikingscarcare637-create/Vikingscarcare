import type { Language } from "../context/contextStore";
import { supabase } from "./supabase";

export type BookingEmailPayload = {
  booking_id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  vehicle_type: string;
  selected_service: string;
  reg_number: string;
  price_text: string;
  message: string | null;
  source: "website";
  language: Language;
  logo_url?: string;
};

export type BookingEmailResponse = {
  success: boolean;
  emailSent: boolean;
  message?: string;
  id?: string | null;
  requestId?: string;
};

export const sendBookingEmail = async (payload: BookingEmailPayload) => {
  if (!supabase) {
    return { error: new Error("Supabase is not configured") };
  }

  try {
    console.info("[booking-email] Invoking send-booking-email", {
      service: payload.selected_service,
      booking_id: payload.booking_id
    });

    const { data, error } = await supabase.functions.invoke<BookingEmailResponse>("send-booking-email", {
      body: payload
    });

    if (error) {
      console.error("[booking-email] Edge Function returned an error", error);
      return { data, error };
    } else {
      console.info("[booking-email] Edge Function response", data);
    }

    return { data, error };
  } catch (error) {
    console.error("[booking-email] Edge Function invocation failed", error);
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }
};
