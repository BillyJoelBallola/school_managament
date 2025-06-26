"use server";

import prisma from "@/lib/prisma";

export async function getAllAssignment(
  take: number,
  skip: number,
  query?: Object
) {
  try {
    const [assignments, count] = await prisma.$transaction([
      prisma.assignment.findMany({
        where: query,
        include: {
          lesson: {
            select: {
              subject: { select: { name: true } },
              class: { select: { name: true } },
              teacher: { select: { name: true, surname: true } },
            },
          },
        },
        take: take,
        skip: skip,
      }),
      prisma.assignment.count({ where: query }),
    ]);

    return { assignments, count };
  } catch (error: any) {
    console.error("error in getAllAssignment(): ", error);
    throw new Error("Failed to fetch assignments");
  }
}
