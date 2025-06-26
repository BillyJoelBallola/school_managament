"use server";

import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { currentUserId, role } from "@/lib/settings";

export async function getAllEvent(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.EventWhereInput = {};

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
              query.title = value;
              break;
          }
        }
      }
    }

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

export async function getEventByDate(date: Date) {
  try {
    const data = await prisma.event.findMany({
      where: {
        startTime: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lte: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
      take: 3,
    });

    return data;
  } catch (error: any) {
    console.error("error in getEventByDate(): ", error);
    throw new Error("Failed to fetch events by date");
  }
}
