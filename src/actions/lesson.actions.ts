"use server";

import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function getAllLesson(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.LessonWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "classId":
              query.classId = parseInt(value);
              break;
            case "teacherId":
              query.teacherId = value;
              break;
            case "search":
              query.OR = [
                { subject: { name: { contains: value, mode: "insensitive" } } },
                { teacher: { name: { contains: value, mode: "insensitive" } } },
              ];
              break;
          }
        }
      }
    }

    const [lessons, count] = await prisma.$transaction([
      prisma.lesson.findMany({
        where: query,
        include: {
          subject: { select: { name: true } },
          class: { select: { name: true } },
          teacher: { select: { name: true, surname: true } },
        },
        take: take,
        skip: skip,
      }),
      prisma.lesson.count({ where: query }),
    ]);

    return { lessons, count };
  } catch (error: any) {
    console.error("error in getAllLesson(): ", error);
    throw new Error("Failed to fetch lessons");
  }
}
