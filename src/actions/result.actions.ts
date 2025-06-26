"use server";

import prisma from "@/lib/prisma";

export async function getAllResult(take: number, skip: number, query?: Object) {
  try {
    const [results, count] = await prisma.$transaction([
      prisma.result.findMany({
        where: query,
        include: {
          student: { select: { name: true, surname: true } },
          exam: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
          assignment: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
        },
        take: take,
        skip: skip,
      }),
      prisma.result.count({ where: query }),
    ]);

    return { results, count };
  } catch (error: any) {
    console.error("error in getAllResult(): ", error);
    throw new Error("Failed to fetch results");
  }
}
