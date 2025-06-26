"use server";

import prisma from "@/lib/prisma";

export async function getAllStudent(
  take: number,
  skip: number,
  query?: Object
) {
  try {
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
