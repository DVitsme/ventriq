"use client";
import { sendGAEvent } from "@next/third-parties/google";

type VentriqEvent =
  | ["luma_register_click", { cta_location: string; link_url: string }]
  | ["generate_lead", { form_id: "contact" | "chapter"; lead_source?: string }]
  | ["sign_up", { method: "newsletter" }];

export function track<E extends VentriqEvent>(name: E[0], params: E[1]) {
  sendGAEvent("event", name, params);
}
