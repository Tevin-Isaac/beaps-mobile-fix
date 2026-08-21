import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, phone, model, issue, details, date, time } = req.body || {};
    if (!name || !phone || !model || !date || !time) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        model,
        issue: issue || null,
        details: details || null,
        date,
        time,
      },
    });
    res.status(201).json(booking);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
