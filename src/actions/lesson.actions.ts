"use server";

import { Prisma } from "@/generated/prisma";
import { LessonInputs } from "@/lib/formValidations";
import prisma from "@/lib/prisma";

export async function getAllLesson(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.LessonWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "classId":
              query.classId = parseInt(value);
              break;
            case "teacherId":
              query.teacherId = value;
              break;
            case "search":
              query.OR = [
                { subject: { name: { contains: value, mode: "insensitive" } } },
                { teacher: { name: { contains: value, mode: "insensitive" } } },
              ];
              break;
          }
        }
      }
    }

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

export async function getBigCalendarData({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) {
  try {
    const data = await prisma.lesson.findMany({
      where: {
        ...(type === "teacherId"
          ? { teacherId: id as string }
          : { classId: id as number }),
      },
    });

    return data;
  } catch (error: any) {
    console.error("error in getBigCalendarData(): ", error);
    throw new Error("Failed to fetch lessons");
  }
}

export async function getLessonRelatedData() {
  try {
    const [lessonSubjects, lessonClasses, lessonTeachers] = await Promise.all([
      prisma.subject.findMany({
        select: { id: true, name: true },
      }),
      prisma.class.findMany({
        select: { id: true, name: true },
      }),
      prisma.teacher.findMany({
        select: { id: true, name: true, surname: true },
      }),
    ]);

    return { lessonSubjects, lessonClasses, lessonTeachers };
  } catch (error: any) {
    console.error("error in getLessonRelatedData(): ", error);
    throw new Error("Failed to fetch lesson related data");
  }
}

export async function createLesson(
  currentState: { success: boolean; error: boolean },
  data: LessonInputs
) {
  try {
    await prisma.lesson.create({
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectId: data.subjectId,
        classId: data.classId,
        teacherId: data.teacherId as string,
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in createLesson(): ", error);
    return { success: false, error: true };
  }
}

export async function updateLesson(
  currentState: { success: boolean; error: boolean },
  data: LessonInputs
) {
  try {
    await prisma.lesson.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectId: data.subjectId,
        classId: data.classId,
        teacherId: data.teacherId as string,
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in updateLesson(): ", error);
    return { success: false, error: true };
  }
}

export async function deleteLesson(
  currentState: { success: boolean; error: boolean },
  data: FormData
) {
  try {
    const id = data.get("id") as string;

    await prisma.lesson.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in deleteLesson(): ", error);
    return { success: false, error: true };
  }
}
