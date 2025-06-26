"use server";

import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function getAllStudent(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.StudentWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "teacherId":
              query.class = {
                lessons: {
                  some: {
                    teacherId: value,
                  },
                },
              };
              break;
            case "search":
              query.name = { contains: value, mode: "insensitive" };
              break;
          }
        }
      }
    }

    const [students, count] = await prisma.$transaction([
      prisma.student.findMany({
        where: query,
        include: {
          class: true,
        },
        take: take,
        skip: skip,
      }),
      prisma.student.count({ where: query }),
    ]);

    return { students, count };
  } catch (error: any) {
    console.error("error in getAllStudent(): ", error);
    throw new Error("Failed to fetch students");
  }
}
