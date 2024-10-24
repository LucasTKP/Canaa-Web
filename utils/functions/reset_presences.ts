import { UserModel } from "@/models/user";
import { updateUser } from "@/repositories/userFireStore";

//Função para resetar presenças, atualmente não esta sendo usada
export async function resetPresences(users: UserModel[]) {
    for (const user of users) {
        user.totalPresence = 0;
        await updateUser(user);
    }
}
