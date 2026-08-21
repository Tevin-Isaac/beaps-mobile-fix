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
    const { name, covers, price, eta, image } = req.body || {};
    const data: Record<string, unknown> = {};
    if (typeof name === "string") data.name = name;
    if (typeof covers === "string") data.covers = covers;
    if (typeof price === "number") data.price = price;
    if (typeof eta === "string") data.eta = eta;
    if (typeof image === "string") data.image = image;
    const repair = await prisma.repairService.update({ where: { id }, data });
    res.status(200).json(repair);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
