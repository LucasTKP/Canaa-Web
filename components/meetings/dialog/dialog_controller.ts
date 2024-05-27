import { MeetingModel } from "@/models/meeting";
import { createMeeting } from "@/repositories/meetingFireStore";
import { formatterError } from "@/utils/formatter_error";
import { FormEvent } from "react";
import { toast } from "react-toastify";

interface OnCreateMeeting {
  e: FormEvent<HTMLFormElement>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  closeDialog: () => void;
}

export async function onCreateMeeting({
  e,
  setIsLoading,
  closeDialog,
}: OnCreateMeeting) {
  e.preventDefault();
  setIsLoading(true);

  const dataMeeting = formatterDataMeeting(e);
  if (verifyDataMeeting(dataMeeting)) {
    try {
      await createMeeting(dataMeeting);
      toast.success("Palestra cadastrada com sucesso.");
      closeDialog();
    } catch (error) {
      console.log(error);
      formatterError(error);
    }
  }
  setIsLoading(false);
}

function formatterDataMeeting(
  e: FormEvent<HTMLFormElement>
): Omit<MeetingModel, "id"> {
  const formData = new FormData(e.currentTarget);
  const dateString = formData.get("date") as string;
  const password = formData.get("password") as string;
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);

  var dataMeeting: Omit<MeetingModel, "id"> = {
    theme: formData.get("theme") as string,
    description: formData.get("description") as string,
    date: date,
    password: password.toLocaleLowerCase(),
  };

  return dataMeeting;
}

function verifyDataMeeting(dataMeeting: Omit<MeetingModel, "id">): boolean {
  if (
    dataMeeting.theme.length > 0 &&
    dataMeeting.description.length > 0 &&
    dataMeeting.password.length > 0 &&
    dataMeeting.date != null
  ) {
    return true;
  }
  toast.error("Dados insuficientes");
  return false;
}
