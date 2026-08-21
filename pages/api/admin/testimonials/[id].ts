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

  if (req.method === "DELETE") {
    await prisma.testimonial.delete({ where: { id } });
    res.status(204).end();
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
