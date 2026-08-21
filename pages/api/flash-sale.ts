import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const sale = await prisma.flashSale.findUnique({ where: { id: "main" } });
    res.status(200).json(sale);
    return;
  }

  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.isAdmin) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const { active, title, message, startsAt, endsAt } = req.body || {};
    const data: Record<string, unknown> = {};
    if (typeof active === "boolean") data.active = active;
    if (typeof title === "string") data.title = title;
    if (typeof message === "string") data.message = message;
    if (startsAt === null || typeof startsAt === "string") data.startsAt = startsAt ? new Date(startsAt) : null;
    if (endsAt === null || typeof endsAt === "string") data.endsAt = endsAt ? new Date(endsAt) : null;
    const sale = await prisma.flashSale.update({ where: { id: "main" }, data });
    res.status(200).json(sale);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
