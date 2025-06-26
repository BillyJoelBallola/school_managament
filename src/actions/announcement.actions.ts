"use server";

import prisma from "@/lib/prisma";

export async function getAllAnnouncement(
  take: number,
  skip: number,
  query?: Object
) {
  try {
    const [announcements, count] = await prisma.$transaction([
      prisma.announcement.findMany({
        where: query,
        include: {
          class: { select: { name: true, lessons: true } },
        },
        take: take,
        skip: skip,
      }),
      prisma.announcement.count({ where: query }),
    ]);

    return { announcements, count };
  } catch (error: any) {
    console.error("error in getAllAnnouncement(): ", error);
    throw new Error("Failed to fetch announcements");
  }
}
