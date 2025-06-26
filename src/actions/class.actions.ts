"use server";

import prisma from "@/lib/prisma";

export async function getAllClass(take: number, skip: number, query?: Object) {
  try {
    const [classes, count] = await prisma.$transaction([
      prisma.class.findMany({
        where: query,
        include: {
          supervisor: { select: { name: true } },
          grade: { select: { level: true } },
          students: { select: { id: true } },
        },
        take: take,
        skip: skip,
      }),
      prisma.class.count({ where: query }),
    ]);

    return { classes, count };
  } catch (error: any) {
    console.error("error in getAllClass(): ", error);
    throw new Error("Failed to fetch classes");
  }
}
