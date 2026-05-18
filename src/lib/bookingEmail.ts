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

export const sendBookingEmail = async (payload: BookingEmailPayload) => {
  if (!supabase) {
    return { error: new Error("Supabase is not configured") };
  }

  const { data, error } = await supabase.functions.invoke("send-booking-email", {
    body: payload
  });

  return { data, error };
};
