import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.isAdmin) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  if (req.method === "POST") {
    const { quote, author, context } = req.body || {};
    if (!quote || !author || !context) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const testimonial = await prisma.testimonial.create({ data: { quote, author, context } });
    res.status(201).json(testimonial);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
