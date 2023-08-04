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

export const isLoginAtom = atom({ //하나의 원소만 recoil로 생성할 때!
    key: 'isLogin',
    default: 0,
  });
export const isEmailAtom = atom({
    key: 'isEmail',
    default: "",
  });
export const isNickNameAtom = atom({
    key: 'isNickName',
    default: "0",
  });