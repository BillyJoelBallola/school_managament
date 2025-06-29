import { IFormDialog } from "@/lib/types";
import FormDialog from "@/components/FormDialog";
import { getSubjectRelatedData } from "@/actions/subject.actions";
import { getClassRelatedData } from "@/actions/class.actions";
import { getLessonRelatedData } from "@/actions/lesson.actions";
import { getExamRelatedData } from "@/actions/exam.action";

async function FormContainer({ table, type, data, id }: IFormDialog) {
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await getSubjectRelatedData();
        relatedData = { teachers: subjectTeachers };
        break;
      case "class":
        const { classGrades, classTeachers } = await getClassRelatedData();
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;
      case "lesson":
        const { lessonSubjects, lessonClasses, lessonTeachers } =
          await getLessonRelatedData();
        relatedData = {
          subjects: lessonSubjects,
          teachers: lessonTeachers,
          classes: lessonClasses,
        };
        break;
      case "exam":
        const examLessons = await getExamRelatedData();
        relatedData = { lessons: examLessons };
        break;
      default:
        break;
    }
  }

  return (
    <FormDialog
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  );
}

export default FormContainer;
