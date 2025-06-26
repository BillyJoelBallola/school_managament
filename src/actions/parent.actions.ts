"use server";

import prisma from "@/lib/prisma";

export async function getAllParent(take: number, skip: number, query?: Object) {
  try {
    const [parents, count] = await prisma.$transaction([
      prisma.parent.findMany({
        where: query,
        include: {
          students: true,
        },
        take: take,
        skip: skip,
      }),
      prisma.parent.count({ where: query }),
    ]);

    return { parents, count };
  } catch (error: any) {
    console.error("error in getAllParent(): ", error);
    throw new Error("Failed to fetch parents");
  }
}
