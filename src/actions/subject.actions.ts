"use server";

import prisma from "@/lib/prisma";

export async function getAllSubject(
  take: number,
  skip: number,
  query?: Object
) {
  try {
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
