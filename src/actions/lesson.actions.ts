"use server";

import prisma from "@/lib/prisma";

export async function getAllLesson(take: number, skip: number, query?: Object) {
  try {
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
