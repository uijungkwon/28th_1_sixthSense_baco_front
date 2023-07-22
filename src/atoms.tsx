import { atom } from "recoil";
export interface IRoad {
    id:number;
    start:string;
    end: string;
    review:string;
  }
export const roadState = atom<IRoad[]>({
    key: "road",
    default: [],
  });
