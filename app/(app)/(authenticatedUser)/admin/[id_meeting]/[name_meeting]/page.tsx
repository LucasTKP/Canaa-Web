'use client'
import Users from "@/components/admin/users/users";
import React from "react";

export default function Page({ params }: { params: { id_meeting: string, name_meeting: string } }) {
  return (
    <Users
      idMeeting={params.id_meeting}
      nameMeeting={decodeURIComponent(params.name_meeting)}
    />
  );
}
