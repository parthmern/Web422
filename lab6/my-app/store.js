import usersDataJson from "./data/users.json";
import { atom } from "jotai";

export const usersAtom = atom(usersDataJson.users);
