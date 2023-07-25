import { atom } from "recoil";
export interface IRoad {
    id:number;
    start:string;
    end: string;
    review:string;
  }
export interface IGps {
    x:string;
    y:string;
  }
export const gpsState = atom<IGps[]>({
  key: "gps",
  default: [],
});

export const roadState = atom<IRoad[]>({
    key: "road",
    default: [],
  });
