"use server";

import { Prisma } from "@/generated/prisma";
import { SubjectInputs } from "@/lib/formValidations";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllSubject(
  take: number,
  skip: number,
  queryParams?: Object
) {
  try {
    const query: Prisma.SubjectWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case "search":
              query.name = { contains: value, mode: "insensitive" };
              break;
          }
        }
      }
    }

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

export async function getSubjectRelatedData() {
  try {
    const data = await prisma.teacher.findMany({
      select: { id: true, name: true, surname: true },
    });

    return data;
  } catch (error: any) {
    console.error("error in getSubjectRelatedData(): ", error);
    throw new Error("Failed to fetch subjects related data");
  }
}

export async function createSubject(
  currentState: { success: boolean; error: boolean },
  data: SubjectInputs
) {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in createSubject(): ", error);
    return { success: false, error: true };
  }
}

export async function updateSubject(
  currentState: { success: boolean; error: boolean },
  data: SubjectInputs
) {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in createSubject(): ", error);
    return { success: false, error: true };
  }
}

export async function deleteSubject(
  currentState: { success: boolean; error: boolean },
  data: FormData
) {
  try {
    const id = data.get("id") as string;

    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (error: any) {
    console.error("error in deleteSubject(): ", error);
    return { success: false, error: true };
  }
}
