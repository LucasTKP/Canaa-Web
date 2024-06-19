import { MeetingModel } from "@/models/meeting";
import { UserModel } from "@/models/user";
import { createMeeting, editMeeting } from "@/repositories/meetingFireStore";
import { formatterError } from "@/utils/functions/formatter_error";
import { FormEvent } from "react";
import { toast } from "react-toastify";

interface OnEditUser {
  e: FormEvent<HTMLFormElement>;
  user: UserModel;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMeetings: React.Dispatch<React.SetStateAction<MeetingModel[]>>;
  setMeetingSelect: React.Dispatch<React.SetStateAction<MeetingModel | null>>;
}

export async function onEditUser({
  e,
  meeting,
  setIsLoading,
  setMeetings,
  setMeetingSelect,
}: OnEditUser) {
  e.preventDefault();
  setIsLoading(true);

  const dataMeeting = formatterDataMeeting({meeting, e});
  if (verifyDataMeeting(dataMeeting)) {
    try {
      await editMeeting(dataMeeting);
      toast.success("Palestra editada com sucesso.");
      await onGetMeetings({ setMeetings });
      setMeetingSelect(null);
    } catch (error) {
      console.log(error);
      formatterError(error);
    }
  }
  setIsLoading(false);
}

interface formatterDataMeetingProps {
  meeting: MeetingModel;
  e: FormEvent<HTMLFormElement>;
}

function formatterDataMeeting({
  meeting,
  e,
}: formatterDataMeetingProps): MeetingModel {
  const formData = new FormData(e.currentTarget);
  const dateString = formData.get("date") as string;
  const password = formData.get("password") as string;

  const localDateString = `${dateString}T00:00:00`;
  const date = new Date(localDateString);

  var dataMeeting: MeetingModel = {
    id: meeting.id,
    theme: formData.get("theme") as string,
    description: formData.get("description") as string,
    date: date,
    password: password.toLocaleLowerCase(),
    isVisible: formData.get("isVisible") as string == "true" ? true : false,
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
