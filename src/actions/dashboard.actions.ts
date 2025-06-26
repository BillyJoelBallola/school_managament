import prisma from "@/lib/prisma";

export async function getUserCount(
  type: "admin" | "teacher" | "student" | "parent"
) {
  try {
    const modelMap: Record<typeof type, any> = {
      admin: prisma.admin,
      teacher: prisma.teacher,
      student: prisma.student,
      parent: prisma.parent,
    };

    const userCount = await modelMap[type].count();

    return userCount;
  } catch (error: any) {
    console.error("error in getUserCount(): ", error);
    throw new Error("Failed to fetch users count");
  }
}

export async function getStudentGenderCount() {
  try {
    const genderCount = await prisma.student.groupBy({
      by: ["sex"],
      _count: true,
    });

    const boys = genderCount.find((item) => item.sex === "MALE")?._count || 0;
    const girls =
      genderCount.find((item) => item.sex === "FEMALE")?._count || 0;

    const total = boys + girls;

    return { boys, girls, total };
  } catch (error: any) {
    console.error("error in getUserCount(): ", error);
    throw new Error("Failed to fetch users count");
  }
}

export async function getAttendanceForThisWeek() {
  try {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSincenMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const lastMonday = new Date(today);

    lastMonday.setDate(today.getDate() - daysSincenMonday);

    const responseData = await prisma.attendance.findMany({
      where: {
        date: {
          gte: lastMonday,
        },
      },
      select: {
        date: true,
        present: true,
      },
    });

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    const attendanceMap: {
      [key: string]: { present: number; absent: number };
    } = {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

    responseData.forEach((item) => {
      const itemDate = new Date(item.date);

      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const dayName = daysOfWeek[dayOfWeek - 1];
        if (item.present) {
          attendanceMap[dayName].present += 1;
        } else {
          attendanceMap[dayName].absent -= 1;
        }
      }
    });

    const data = daysOfWeek.map((day) => ({
      name: day,
      present: attendanceMap[day].present,
      absent: attendanceMap[day].absent,
    }));

    return data;
  } catch (error: any) {
    console.error("error in getAttendanceForThisWeek(): ", error);
    throw new Error("Failed to fetch attendance for this week");
  }
}
