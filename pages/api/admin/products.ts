import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.isAdmin) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  if (req.method === "POST") {
    const { name, cat, price, tag, note, image, installments } = req.body || {};
    if (!name || !cat || typeof price !== "number" || !image) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    let slug = slugify(name);
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;
    const product = await prisma.product.create({
      data: { slug, name, cat, price, tag: tag || "New", note: note || "", image, installments: !!installments },
    });
    res.status(201).json(product);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
