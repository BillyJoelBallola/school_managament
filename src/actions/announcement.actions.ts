"use server";

import { Prisma } from "@/generated/prisma";
import { currentUserId, role } from "@/lib/settings";
import prisma from "@/lib/prisma";

export async function getAllAnnouncement(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.AnnouncementWhereInput = {};

    const roleCondition = {
      teacher: { lessons: { some: { teacherId: currentUserId! } } },
      student: { students: { some: { id: currentUserId! } } },
      parent: { students: { some: { parentId: currentUserId! } } },
    };

    query.OR = [
      { classId: null },
      { class: roleCondition[role as keyof typeof roleCondition] || {} },
      ...(role === "admin" ? [{ classId: { not: null } }] : []),
    ];

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "search":
              query.title = { contains: value, mode: "insensitive" };
              break;
            default:
              break;
          }
        }
      }
    }

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

export async function getAnnouncementByRole() {
  try {
    const roleCondition = {
      teacher: { lessons: { some: { teacherId: currentUserId! } } },
      student: { students: { some: { id: currentUserId! } } },
      parent: { students: { some: { parentId: currentUserId! } } },
    };

    const data = await prisma.announcement.findMany({
      where: {
        ...(role !== "admin" && {
          OR: [
            { classId: null },
            { class: roleCondition[role as keyof typeof roleCondition] || {} },
          ],
        }),
      },
      orderBy: { date: "desc" },
      take: 3,
    });

    return data;
  } catch (error: any) {
    console.error("error in getAllAnnouncement(): ", error);
    throw new Error("Failed to fetch announcements");
  }
}
