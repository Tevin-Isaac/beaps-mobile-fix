import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.isAdmin) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const id = req.query.id as string;

  if (req.method === "PUT") {
    const { name, cat, price, tag, note, image, installments } = req.body || {};
    const data: Record<string, unknown> = {};
    if (typeof name === "string") data.name = name;
    if (typeof cat === "string") data.cat = cat;
    if (typeof price === "number") data.price = price;
    if (typeof tag === "string") data.tag = tag;
    if (typeof note === "string") data.note = note;
    if (typeof image === "string") data.image = image;
    if (typeof installments === "boolean") data.installments = installments;
    const product = await prisma.product.update({ where: { id }, data });
    res.status(200).json(product);
    return;
  }

  if (req.method === "DELETE") {
    await prisma.product.delete({ where: { id } });
    res.status(204).end();
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
