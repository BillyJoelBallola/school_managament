"use server";

import prisma from "@/lib/prisma";

export async function getAllExam(take: number, skip: number, query?: Object) {
  try {
    const [exams, count] = await prisma.$transaction([
      prisma.exam.findMany({
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
      prisma.exam.count({ where: query }),
    ]);

    return { exams, count };
  } catch (error: any) {
    console.error("error in getAllExam(): ", error);
    throw new Error("Failed to fetch exams");
  }
}
