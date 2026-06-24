import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(7).max(20),
  email: z.string().email().max(120),
  propertyType: z.enum(["Flat", "Shop", "Office", "Plot", "Resale & Rental"]),
  message: z.string().max(2000).optional().default(""),
});

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
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
        // TODO: wire to Lovable Emails / Resend to deliver to aaurareality19@gmail.com
        console.log("[Aaura lead]", parsed.data);
        return Response.json({ ok: true });
      },
    },
  },
});