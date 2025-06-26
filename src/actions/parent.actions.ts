"use server";

import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function getAllParent(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.ParentWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "search":
              query.name = { contains: value, mode: "insensitive" };
              break;
          }
        }
      }
    }

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
