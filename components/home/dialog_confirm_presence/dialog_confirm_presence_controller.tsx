import { MeetingModel } from "@/models/meeting";
import { PresenceModel } from "@/models/presence";
import { UserModel } from "@/models/user";
import { createPresence, getPresences } from "@/repositories/presenceFireStore";
import { updateUser } from "@/repositories/userFireStore";
import { formatterError } from "@/utils/functions/formatter_error";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { toast } from "react-toastify";

interface IOnConfirmPresenceProps {
  e: FormEvent<HTMLFormElement>;
  meeting: MeetingModel;
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel | undefined>>;
  setPresences: React.Dispatch<React.SetStateAction<PresenceModel[] | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  closeDialog: () => void;
}

export async function onConfirmPresence({
  e,
  meeting,
  user,
  setUser,
  setIsLoading,
  setPresences,
  closeDialog,
}: IOnConfirmPresenceProps) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const password = formData.get("password") as string;
  if (
    password.toLocaleLowerCase().trim() ===
    meeting.password.toLocaleLowerCase().trim()
  ) {
    setIsLoading(true);
    const dataPresence: Omit<PresenceModel, "id"> = {
      id_meeting: meeting.id,
      id_user: user.id,
      date: meeting.date,
    };

    try {
      await createPresence(dataPresence);
      const dataNewUser = await onUpdateTotalPresenceAndLastPresence({
        user,
        lastPresence: meeting.date,
      });

      const presences = await getPresences(meeting.date, user.id);
      setUser(dataNewUser);
      setPresences(presences);
      setIsLoading(false);
      toast.success("Presença registrada com sucesso");
      return closeDialog();
    } catch (error) {
      formatterError(error);
    }
  }
  setIsLoading(false);
  return toast.error("Senha Incorreta");
}

async function onUpdateTotalPresenceAndLastPresence({
  user,
  lastPresence,
}: {
  user: UserModel;
  lastPresence: Date;
}): Promise<UserModel> {
  let newUser = { ...user };
  newUser.totalPresence = user.totalPresence + 1;
  newUser.lastPresence = lastPresence;
  if (!newUser.madeCaneYear) {
    delete newUser.madeCaneYear;
  }
  await updateUser(newUser);
  return newUser;
}
