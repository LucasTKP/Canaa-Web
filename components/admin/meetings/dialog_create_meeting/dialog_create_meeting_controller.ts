import { MeetingModel } from "@/models/meeting";
import { createMeeting } from "@/repositories/meetingFireStore";
import { formatterError } from "@/utils/functions/formatter_error";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { onGetMeetings } from "../table_meetings/table_meetings_controller";

interface OnCreateMeeting {
  e: FormEvent<HTMLFormElement>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMeetings: React.Dispatch<React.SetStateAction<MeetingModel[]>>;
  closeDialog: () => void;
}

export async function onCreateMeeting({
  e,
  setIsLoading,
  setMeetings,
  closeDialog,
}: OnCreateMeeting) {
  e.preventDefault();
  setIsLoading(true);

  const dataMeeting = formatterDataMeeting(e);
  if (verifyDataMeeting(dataMeeting)) {
    try {
      await createMeeting(dataMeeting);
      toast.success("Reunião cadastrada com sucesso.");
      await onGetMeetings({setMeetings});
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

  const localDateString = `${dateString}T00:00:00`;
  const date = new Date(localDateString);

  var dataMeeting: Omit<MeetingModel, "id"> = {
    theme: formData.get("theme") as string,
    description: formData.get("description") as string,
    date: date,
    password: password.toLocaleLowerCase().trim(),
    isVisible: false,
    isOpen: false
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
