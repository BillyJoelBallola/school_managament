"use server";

import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function getAllClass(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.ClassWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "studentId":
              query.students = {
                some: {
                  id: value,
                },
              };
              break;
            case "supervisorId":
              query.supervisorId = value;
              break;
            case "search":
              query.name = { contains: value, mode: "insensitive" };
              break;
          }
        }
      }
    }

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
