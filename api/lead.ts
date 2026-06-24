import { z } from "zod";

export const config = { runtime: "edge" };

const LeadSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(7).max(20),
  email: z.string().email().max(120),
  propertyType: z.enum(["Flat", "Shop", "Office", "Plot", "Resale & Rental"]),
  message: z.string().max(2000).optional().default(""),
});

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  // TODO: forward to email service (Resend etc.) targeting aaurareality19@gmail.com
  console.log("[Aaura lead]", parsed.data);
  return Response.json({ ok: true });
}