import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, phone, model, issue, details, date, time } = req.body || {};
    if (!name || !phone || !model || !date || !time) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const booking = await prisma.booking.create({
      data: {
        name,
        email: email || null,
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

  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const bookings = await prisma.booking.findMany({
      where: { email: session.user.email },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(bookings);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
