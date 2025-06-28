import { IFormDialog } from "@/lib/types";
import FormDialog from "@/components/FormDialog";
import { getSubjectRelatedData } from "@/actions/subject.actions";

async function FormContainer({ table, type, data, id }: IFormDialog) {
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await getSubjectRelatedData();
        relatedData = { teachers: subjectTeachers };
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
