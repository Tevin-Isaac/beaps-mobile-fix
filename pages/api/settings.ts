import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const settings = await prisma.setting.findUnique({ where: { id: "main" } });
    res.status(200).json(settings);
    return;
  }

  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.isAdmin) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const { phoneDisplay, phoneTel, whatsapp, email, addressLine, addressDetail, hours } = req.body || {};
    const data: Record<string, string> = {};
    if (typeof phoneDisplay === "string") data.phoneDisplay = phoneDisplay;
    if (typeof phoneTel === "string") data.phoneTel = phoneTel;
    if (typeof whatsapp === "string") data.whatsapp = whatsapp;
    if (typeof email === "string") data.email = email;
    if (typeof addressLine === "string") data.addressLine = addressLine;
    if (typeof addressDetail === "string") data.addressDetail = addressDetail;
    if (typeof hours === "string") data.hours = hours;
    const settings = await prisma.setting.update({ where: { id: "main" }, data });
    res.status(200).json(settings);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
