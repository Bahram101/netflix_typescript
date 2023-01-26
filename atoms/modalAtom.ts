import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";
import { Movie } from "../types/typings";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const movieState = atom<Movie | Document | null>({
  key: "movieState",
  default: null,
});
