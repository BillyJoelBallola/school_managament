"use server";

import prisma from "@/lib/prisma";

export async function getAllEvent(take: number, skip: number, query?: Object) {
  try {
    const [events, count] = await prisma.$transaction([
      prisma.event.findMany({
        where: query,
        include: {
          class: { select: { name: true, lessons: true } },
        },
        take: take,
        skip: skip,
      }),
      prisma.event.count({ where: query }),
    ]);

    return { events, count };
  } catch (error: any) {
    console.error("error in getAllEvent(): ", error);
    throw new Error("Failed to fetch events");
  }
}
