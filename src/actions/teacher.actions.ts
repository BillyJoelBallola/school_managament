"use server";

import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function getAllTeacher(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.TeacherWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "classId":
              query.lessons = {
                some: {
                  classId: parseInt(value),
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

    const [teachers, count] = await prisma.$transaction([
      prisma.teacher.findMany({
        where: query,
        include: {
          subjects: true,
          classes: true,
        },
        take: take,
        skip: skip,
      }),
      prisma.teacher.count({ where: query }),
    ]);

    return { teachers, count };
  } catch (error: any) {
    console.error("error in getAllTeacher(): ", error);
    throw new Error("Failed to fetch teachers");
  }
}
