import BigCalendar from "@/components/BigCalendar";
import PerformanceChart from "@/components/charts/PerformanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpenText,
  Calendar,
  CalendarDays,
  HeartPulse,
  Mail,
  NotepadText,
  Phone,
  SquareLibrary,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function SingleStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <Card className="flex-1">
            <CardContent className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="rounded-full overflow-hidden size-20">
                  <Image
                    src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w-1200"
                    alt="image"
                    width={150}
                    height={150}
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 flex flex-col justify-between gap-2">
                <h1 className="text-xl font-semibold text-center md:text-left">
                  Allie Summers
                </h1>
                <p className="text-sm text-muted-foreground text-center md:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="mt-2 flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                  <div className="flex gap-2 w-full lg:w-full md:w-1/3">
                    <HeartPulse className="size-4" />
                    <span>A+</span>
                  </div>
                  <div className="flex gap-2 w-full lg:w-full md:w-1/3">
                    <Calendar className="size-4" />
                    <span>June 2025</span>
                  </div>
                  <div className="flex gap-2 w-full lg:w-full md:w-1/3">
                    <Mail className="size-4" />
                    <span>alliesummers@gmail.com</span>
                  </div>
                  <div className="flex gap-2 w-full lg:w-full md:w-1/3">
                    <Phone className="size-4" />
                    <span>+1 234 567</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex-1 grid sm:grid-cols-2 gap-4">
            <Card className="w-full">
              <CardContent className="flex gap-4">
                <CalendarDays className="size-6 mt-1" />
                <div>
                  <h2 className="font-semibold text-xl">94%</h2>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent className="flex gap-4">
                <NotepadText className="size-6 mt-1" />
                <div>
                  <h2 className="font-semibold text-xl">6th</h2>
                  <p className="text-sm text-muted-foreground">Grade</p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent className="flex gap-4">
                <BookOpenText className="size-6 mt-1" />
                <div>
                  <h2 className="font-semibold text-xl">18</h2>
                  <p className="text-sm text-muted-foreground">Lessons</p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent className="flex gap-4">
                <SquareLibrary className="size-6 mt-1" />
                <div>
                  <h2 className="font-semibold text-xl">6A</h2>
                  <p className="text-sm text-muted-foreground">Class Name</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="gap-0">
          <CardHeader>
            <CardTitle>Student&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <BigCalendar />
          </CardContent>
        </Card>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Shortcut</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 flex-wrap text-xs text-muted-foreground">
            <Link
              href={`/list/teachers?classId=${id}`}
              className="rounded-md p-2 bg-neutral-100 dark:bg-neutral-800"
            >
              Student&apos;s Teachers
            </Link>
            <Link
              href={`/list/lessons?classId=${id}`}
              className="rounded-md p-2 bg-neutral-100 dark:bg-neutral-800"
            >
              Student&apos;s Lessons
            </Link>
            <Link
              href={`/list/exams?classId=${id}`}
              className="rounded-md p-2 bg-neutral-100 dark:bg-neutral-800"
            >
              Student&apos;s Exams
            </Link>
            <Link
              href={`/list/lessons?classId=${id}`}
              className="rounded-md p-2 bg-neutral-100 dark:bg-neutral-800"
            >
              Student&apos;s Assignments
            </Link>
            <Link
              href={`/list/results?studentId=${id}`}
              className="rounded-md p-2 bg-neutral-100 dark:bg-neutral-800"
            >
              Student&apos;s Results
            </Link>
          </CardContent>
        </Card>
        <PerformanceChart />
      </div>
    </div>
  );
}

export default SingleStudentPage;
