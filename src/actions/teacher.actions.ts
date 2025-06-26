"use server";

import prisma from "@/lib/prisma";

export async function getAllTeacher(take: number, skip: number, query: Object) {
  try {
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
