"use client";

import {
  Home,
  School,
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  Book,
  FileBarChart,
  ClipboardList,
  BarChart2,
  CalendarDays,
  Mail,
  Megaphone,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";

const menuItems = [
  {
    title: "Menu",
    items: [
      {
        icon: Home,
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: School,
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: GraduationCap,
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: Users,
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: BookOpen,
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: Building2,
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: Book,
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: FileBarChart,
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: ClipboardList,
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: BarChart2,
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: CalendarDays,
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: CalendarDays,
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Mail,
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Megaphone,
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        icon: User,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Settings,
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

function Menu() {
  const { user } = useUser();
  const { theme } = useTheme();
  const pathname = usePathname();
  const role = user?.publicMetadata.role as string;

  const logoSrc = theme === "light" ? "/logo-dark.png" : "/logo-light.png";
  const symbolLogoSrc =
    theme === "light" ? "/logo-symbol-dark.png" : "/logo-symbol-light.png";

  return (
    <div className="text-sm">
      <Link href="/" className="mb-4 hidden lg:block">
        <Image src={logoSrc} alt="logo" width={130} height={130} priority />
      </Link>
      <div className="border rounded-lg bg-neutral-100 dark:bg-neutral-800 grid place-items-center mb-4 p-1 lg:hidden">
        <Link href="/">
          <Image
            src={symbolLogoSrc}
            alt="logo"
            width={40}
            height={40}
            priority
          />
        </Link>
      </div>
      {menuItems.map((menu) => (
        <div className="flex flex-col" key={menu.title}>
          <span className="hidden lg:block text-neutral-500 text-sm font-semibold mt-4 mb-2 mx-2">
            {menu.title}
          </span>
          {menu.items.map((item) =>
            role ? (
              item.visible.includes(role) && (
                <Button
                  variant={
                    pathname.includes(item.href.split("/")[2])
                      ? "outline"
                      : "ghost"
                  }
                  key={item.label}
                  asChild
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-center lg:justify-start gap-2"
                  >
                    <item.icon className="size-4" />
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                </Button>
              )
            ) : (
              <Skeleton
                key={item.label}
                className="h-6 w-full rounded-md mb-2"
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default Menu;
