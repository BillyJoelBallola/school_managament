"use server";

import { Prisma } from "@/generated/prisma";
import { ExamInputs } from "@/lib/formValidations";
import prisma from "@/lib/prisma";
import { currentUserId, role } from "@/lib/settings";

export async function getAllExam(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.ExamWhereInput = {};

    switch (role) {
      case "admin":
        break;
      case "teacher":
        query.lesson = { teacherId: currentUserId! };
        break;
      case "student":
        query.lesson = {
          class: { students: { some: { id: currentUserId! } } },
        };
        break;
      case "parent":
        query.lesson = {
          class: { students: { some: { parentId: currentUserId! } } },
        };
        break;
      default:
        break;
    }

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "classId":
              query.lesson = { classId: parseInt(value) };
              break;
            case "teacherId":
              query.lesson = { teacherId: value };
              break;
            case "search":
              query.lesson = {
                subject: {
                  name: { contains: value, mode: "insensitive" },
                },
              };
              break;
            default:
              break;
          }
        }
      }
    }

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

export async function getExamRelatedData() {
  try {
    const examLessons = await prisma.lesson.findMany({
      select: { id: true, name: true },
    });

    return examLessons;
  } catch (error: any) {
    console.error("error in getExamRelatedData(): ", error);
    throw new Error("Failed to fetch exam related data");
  }
}

export async function createExam(
  currentState: { success: boolean; error: boolean },
  data: ExamInputs
) {
  try {
    await prisma.exam.create({
      data: {
        title: data.title,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in createExam(): ", error);
    return { success: false, error: true };
  }
}

export async function updateExam(
  currentState: { success: boolean; error: boolean },
  data: ExamInputs
) {
  try {
    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in updateExam(): ", error);
    return { success: false, error: true };
  }
}

export async function deleteExam(
  currentState: { success: boolean; error: boolean },
  data: FormData
) {
  try {
    const id = data.get("id") as string;

    await prisma.exam.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in deleteExam(): ", error);
    return { success: false, error: true };
  }
}
