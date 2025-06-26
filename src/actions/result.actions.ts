"use server";

import { Prisma } from "@/generated/prisma";
import { currentUserId, role } from "@/lib/settings";
import prisma from "@/lib/prisma";

export async function getAllResult(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.ResultWhereInput = {};

    switch (role) {
      case "admin":
        break;
      case "teacher":
        query.OR = [
          { exam: { lesson: { teacherId: currentUserId! } } },
          { assignment: { lesson: { teacherId: currentUserId! } } },
        ];
        break;
      case "student":
        query.studentId = currentUserId!;
        break;
      case "parent":
        query.student = { parentId: currentUserId! };
        break;
      default:
        break;
    }

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "studentId":
              query.studentId = value;
              break;
            case "search":
              query.OR = [
                { exam: { title: { contains: value, mode: "insensitive" } } },
                { student: { name: { contains: value, mode: "insensitive" } } },
              ];
              break;
          }
        }
      }
    }

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
