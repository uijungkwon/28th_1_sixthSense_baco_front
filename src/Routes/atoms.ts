import { atom } from 'recoil';

export interface IType {
   // id:number;
    start: string;
    //end: string;
    //review: string;
}

//recoil state 생성
export const contentState = atom<IType>({
    key: 'start',
    default: {
        //id:1,
        start: '메롱1',
        //end: "메롱2",
        //review: "메롱3",
    }
});