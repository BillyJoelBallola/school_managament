"use server";

import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { currentUserId, role } from "@/lib/settings";

export async function getAllAssignment(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.AssignmentWhereInput = {};

    switch (role) {
      case "admin":
        break;
      case "teacher":
        query.lesson = { teacherId: currentUserId! };
        break;
      case "student":
        query.lesson = {
          class: { students: { some: { id: currentUserId! } } },
        };
        break;
      case "parent":
        query.lesson = {
          class: { students: { some: { parentId: currentUserId! } } },
        };
        break;
      default:
        break;
    }

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "classId":
              query.lesson = { classId: parseInt(value) };
              break;
            case "teacherId":
              query.lesson = { teacherId: value };
              break;
            case "search":
              query.OR = [
                {
                  lesson: {
                    subject: {
                      name: { contains: value, mode: "insensitive" },
                    },
                  },
                },
                {
                  lesson: {
                    teacher: {
                      name: { contains: value, mode: "insensitive" },
                    },
                  },
                },
              ];
              break;
            default:
              break;
          }
        }
      }
    }

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
