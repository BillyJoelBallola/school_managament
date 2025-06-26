"use server";

import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function getAllSubject(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.SubjectWhereInput = {};

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

    const [subjects, count] = await prisma.$transaction([
      prisma.subject.findMany({
        where: query,
        include: {
          teachers: true,
        },
        take: take,
        skip: skip,
      }),
      prisma.subject.count({ where: query }),
    ]);

    return { subjects, count };
  } catch (error: any) {
    console.error("error in getAllSubject(): ", error);
    throw new Error("Failed to fetch subjects");
  }
}
