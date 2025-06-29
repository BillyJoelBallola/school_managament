"use server";

import { Prisma } from "@/generated/prisma";
import { ClassInputs } from "@/lib/formValidations";
import prisma from "@/lib/prisma";

export async function getAllClass(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.ClassWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "studentId":
              query.students = {
                some: {
                  id: value,
                },
              };
              break;
            case "supervisorId":
              query.supervisorId = value;
              break;
            case "search":
              query.name = { contains: value, mode: "insensitive" };
              break;
          }
        }
      }
    }

    const [classes, count] = await prisma.$transaction([
      prisma.class.findMany({
        where: query,
        include: {
          supervisor: { select: { name: true } },
          grade: { select: { level: true } },
          students: { select: { id: true } },
        },
        take: take,
        skip: skip,
      }),
      prisma.class.count({ where: query }),
    ]);

    return { classes, count };
  } catch (error: any) {
    console.error("error in getAllClass(): ", error);
    throw new Error("Failed to fetch classes");
  }
}

export async function getClassRelatedData() {
  try {
    const [classGrades, classTeachers] = await Promise.all([
      prisma.grade.findMany({
        select: { id: true, level: true },
      }),
      prisma.teacher.findMany({
        select: { id: true, name: true, surname: true },
      }),
    ]);

    return { classGrades, classTeachers };
  } catch (error: any) {
    console.error("error in getClassRelatedData(): ", error);
    throw new Error("Failed to fetch class related data");
  }
}

export async function createClass(
  currentState: { success: boolean; error: boolean },
  data: ClassInputs
) {
  try {
    await prisma.class.create({
      data: {
        name: data.name,
        capacity: data.capacity,
        gradeId: data.gradeId,
        supervisorId: data.supervisorId,
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in createClass(): ", error);
    return { success: false, error: true };
  }
}

export async function updateClass(
  currentState: { success: boolean; error: boolean },
  data: ClassInputs
) {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        capacity: data.capacity,
        gradeId: data.gradeId,
        supervisorId: data.supervisorId,
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in updateClass(): ", error);
    return { success: false, error: true };
  }
}

export async function deleteClass(
  currentState: { success: boolean; error: boolean },
  data: FormData
) {
  try {
    const id = data.get("id") as string;

    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in deleteClass(): ", error);
    return { success: false, error: true };
  }
}
