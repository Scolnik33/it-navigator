import { Event } from "@prisma/client";
import { instance } from "./axios"

export const getUserEvents = async (id: number): Promise<Event[]> => {
    const { data } = await instance.get<Event[]>(`users/events/${id}`);

    return data;
}