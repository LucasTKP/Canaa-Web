"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { onEditUser } from "./dialog_edit_user_controller";
import { toFormattedDateYYYYMMDDToString } from "@/utils/functions/formmatter_date";
import Select, { StylesConfig } from "react-select";
import { UserModel } from "@/models/user";

interface DialogEditUserModelProps {
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>;
  userSelect: UserModel;
  setUserSelect: React.Dispatch<React.SetStateAction<UserModel | null>>;
}

function DialogEditUser({
  setUsers,
  userSelect,
  setUserSelect,
}: DialogEditUserModelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [madeCane, setMadeCane] = React.useState<boolean>(userSelect.madeCane);

  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid black",
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#479924" : "white",
      color: "black",
    }),
  };
  const options = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ];

  const options2 = [
    { value: 2024, label: 2024 },
    { value: 2023, label: 2023 },
    { value: 2022, label: 2022 },
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 },
    { value: 2018, label: 2018 },
    { value: 2017, label: 2017 },
    { value: 2016, label: 2016 },
    { value: 2015, label: 2015 },
    { value: 2014, label: 2014 },
    { value: 2013, label: 2013 },
    { value: 2012, label: 2012 },
    { value: 2011, label: 2011 },
    { value: 2010, label: 2010 },
    { value: 2009, label: 2009 },
    { value: 2008, label: 2008 },
    { value: 2007, label: 2007 },
  ];

  const handleChange = (selectedOption: any) => {
    setMadeCane(selectedOption.value);
  };

  return (
    <Dialog.Root open={userSelect ? true : false}>
      <Dialog.Trigger
        asChild
        className="bg-primary text-background px-[20px] py-[3px] font-[500] rounded-[5px] hover:brightness-95 duration-200"
      >
        Cadastrar
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-10"
          onClick={() => setUserSelect(null)}
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-10">
          <Dialog.Title className="text-[20px] font-medium">
            Edite este usuário
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 text-[15px]">
            Modifique as informações do usuário nos campos abaixo
          </Dialog.Description>
          <form
            onSubmit={(e) =>
              onEditUser({
                e,
                user: userSelect,
                setIsLoading,
                setUserSelect,
                setUsers,
              })
            }
            className="flex flex-col items-start gap-y-[10px]"
          >
            <label className="w-full" htmlFor="name">
              <p className="text-[15px] font-[500]">Nome:</p>
              <input
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                name="name"
                placeholder="Escreva o nome do usuário"
                type="text"
                required
                defaultValue={userSelect.name}
              />
            </label>

            <label className="w-full" htmlFor="email">
              <p className="text-[15px] font-[500]">Email:</p>
              <input
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                name="email"
                placeholder="Escreva o email do usuário"
                required
                defaultValue={userSelect.email}
              />
            </label>

            <div className="flex items-center justify-between w-full">
              <label htmlFor="totalPresence w-[48%]">
                <p className="text-[15px] font-[500]">Total de Presença:</p>
                <input
                  className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  name="totalPresence"
                  type="number"
                  required
                  defaultValue={userSelect.totalPresence}
                />
              </label>
              <label htmlFor="lastPresence" className="w-[48%]">
                <p className="text-[15px] font-[500]">Última presença:</p>
                <input
                  className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  name="lastPresence"
                  type="date"
                  required
                  defaultValue={toFormattedDateYYYYMMDDToString(
                    userSelect.lastPresence
                  )}
                />
              </label>
            </div>

            <div className="flex items-center justify-between w-full">
              <label className="flex flex-col w-[48%]">
                <p className="text-[18px]"> já fez o acampamento?</p>
                <Select
                  options={options}
                  required={true}
                  name="madeCane"
                  onChange={handleChange}
                  styles={customStyles}
                  defaultValue={options.find(
                    (option) => option.value === userSelect.madeCane
                  )}
                />
              </label>

              {madeCane && (
                <label className="flex flex-col w-[48%]">
                  <p className="text-[16px]">Em que ano?</p>
                  <Select
                    options={options2}
                    required={true}
                    name="madeCaneYear"
                    styles={customStyles}
                    defaultValue={options2.find(
                      (option) => option.value === userSelect.madeCaneYear
                    )}
                  />
                </label>
              )}
            </div>

            <div className="mt-[25px] flex w-full justify-end gap-x-[15px]">
              <Dialog.Close asChild>
                <button
                  onClick={() => setUserSelect(null)}
                  className="bg-red text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[36px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                >
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                className="bg-primary text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                type={"submit"}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="relative flex items-center justify-center w-[25px] h-[25px] rounded-full border-[6px] border-t-gray-400 border-background animate-spin" />
                ) : (
                  "Salvar"
                )}
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              onClick={() => setUserSelect(null)}
              className="absolute top-[10px] right-[10px] h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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

export default DialogEditUser;
