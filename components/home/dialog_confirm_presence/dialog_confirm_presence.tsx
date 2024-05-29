"use client";
import React, { useContext, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
// import { onCreateMeeting } from "./dialog_create_meeting_controller";
import Button_loading from "@/utils/components/button_loading";
import { MeetingModel } from "@/models/meeting";
import { toFormattedDateToString } from "@/utils/functions/formmatter_date";
import { onConfirmPresence } from "./dialog_confirm_presence_controller";
import { UserContext } from "@/context/userContext";

interface DialogConfirmPresenceProps {
  meeting: MeetingModel;
}

function DialogConfirmPresence({ meeting }: DialogConfirmPresenceProps) {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null); // Referência para o botão "Cancelar"

  function closeDialog() {
    if (cancelButtonRef.current) {
      cancelButtonRef.current.click(); // Simula um clique no botão "Cancelar"
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger className="p-[6px] text-[14px] bg-primary/50 rounded-[4px]">
        Marcar Presença
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-[20px] font-medium">
            Confirmar Presença
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 text-[15px]">
            Confirme sua prenseça nesta reunião
          </Dialog.Description>
          <form
            onSubmit={(e) =>
              onConfirmPresence({
                e,
                meeting,
                user: user!,
                setUser,
                setIsLoading,
                closeDialog,
              })
            }
            className="flex flex-col items-start gap-y-[10px]"
          >
            <p>
              <span className="text-[15px] font-[500]">Tema: </span>
              {meeting.theme}
            </p>

            <p className="max-h-[200px] overflow-auto">
              <span className="text-[15px] font-[500] ">Descrição: </span>
              {meeting.description}
            </p>

            <p>
              <span className="text-[15px] font-[500]">Data: </span>
              {toFormattedDateToString(meeting.date)}
            </p>

            <label className="w-full" htmlFor="password">
              <p className="text-[15px] font-[500]">Password:</p>
              <input
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                name="password"
                placeholder="Digite a senha da reunião"
                required
              />
            </label>
            <div className="mt-[25px] flex w-full justify-end gap-x-[15px]">
              <Dialog.Close asChild>
                <button className="bg-red text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Cancelar
                </button>
              </Dialog.Close>
              <Button_loading
                isLoading={isLoading}
                className={
                  "bg-primary text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                }
                type={"submit"}
                title={"Confirmar"}
              />
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              ref={cancelButtonRef}
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon width={25} height={25} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogConfirmPresence;