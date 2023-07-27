import { styled } from "styled-components";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import React from 'react';
import { useForm } from "react-hook-form";
import { useEffect, useState,useRef } from "react";
//배경색 배경 길이 정하기
import { Map } from "react-kakao-maps-sdk";
import { useHistory } from "react-router-dom";
import { contentState } from "./atoms";
import { roadState } from "../atoms";


const kakao = window;
const roadBg = require("../images/roadBg.png");

const Wrapper = styled(motion.div)`
  height: 130vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  background-color:white;
`;

const Banner = styled.div ` 
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 73px;
  background-size: cover;
  position: relative;
  margin-top: 150px;
  background-image:url(${roadBg});
  background-repeat: no-repeat;
`;
const Board = styled(motion.div)`
  display: grid;
  margin-top:-400px;
  grid-template-columns: 1fr 1fr;
`;
const Title = styled.h1`
  margin-top: 100px;
  font-size:37px;
  color:black;
  font-weight:bold;
`;

const MapBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.5);
  width: 600px;
  height: 500px;
  margin-right:100px;
  margin-left:100px;
  margin-top:40px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: whitesmoke;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;
const CreateForm = styled.form`
  padding: 0px 20px;
	display: flex;
	position: relative;
	width: 100%;
	height: 1 px;
	margin: 0 auto;
	margin-bottom: 10px;
	background-color: ${(props) => props.theme.cardColor};
  flex-direction: column;//위아래로 input 창 뜨게 만들기
`;

const Input = styled.input`
    width: 200px;
		border: 1;
		border-radius: 10px;
		background-color: white;
		padding: 8px 15px;
		font-size: 20px;
    margin-left:10px;
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    margin-bottom:40px;
`;
const ReviewInput = styled.input`
    width:280px;
    height:100px;
		border: 1;
		border-radius: 10px;
		background-color: white;
		padding: 8px 15px;
		font-size: 20px;
		//align-items: center;
		//justify-content: center;
		color: ${(props) => props.theme.textColor};
    margin-left:50px;
    margin-top:10px;
`;
const P = styled.p`
    //align-items: center;
		//justify-content: center;
		color: ${(props) => props.theme.textColor};
    //flex-direction: column;
    margin-bottom:10px;
    margin-top:20px;
`;  
const RoadBox = styled(motion.div)`
  padding: 0px 20px;
  background: rgba(255, 255, 255, 0.5);
  width: 500px;
  height: 450px;
  margin-right:100px;
  margin-left:100px;
  margin-top:40px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;


//경로 추천, 경로 저장 버튼 디자인 
const Button = styled.button`
		width: 40%;
    height:40px;
		background-color: #ffff81;
		border: none;
		border-radius: 10px;
		font-size: 28px;
		color: ${(props) => props.theme.accentColor};
    margin-top: 70px;     
    margin-left:200px;

`;
const Label = styled.label`
  background-color: #bbe1fad2;
  border-radius: 10px;
  width:15%;
  font-size:25px;
  color:black;
  margin-left:50px;
  margin-top:20px;
`;
interface IForm { //recoil로 만들어서 변수 사용할 수 있도록 만들기
  start: string;
  end: string;
  review:string;
}

declare global {
  interface Window {
    kakao: any;
  }
}
const Img = styled.img`
  width:600px;
  height:500px;
  border-radius:30px;
`;
function Road() {
  //1) map 보여주기
  
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [state, setState] = useState()

  /*
  const kakaoAPI = window.kakao.maps;
  const options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakaoAPI.LatLng( 37.54365822551167,  126.97226557852383), //지도의 중심좌표.
    level: 4 //지도의 레벨(확대, 축소 정도)
  };
  //const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  const container = useRef(null);
  
  useEffect(() => {
    //const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    setMap(new kakaoAPI.Map(container.current, options));
  }, []);
  */

  const { register, handleSubmit, setValue,getValues, formState: { errors,isDirty }, watch} =useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {
      start:"",
      end:"",
      review:"",
    },
  });
  const history = useHistory();
  const [road, setRoad] = useRecoilState(roadState);
  const [count,setCount]  = useState(7);
  const [photo,setPhoto] = useState(false);
  const onclick = () => {
    setPhoto((prev) =>! prev);
  };
  const onValid = ({start,end, review}: IForm) => {
    //저장 버튼 눌렀을 때 해당 입력들이 저장되도록 생성
    
    setRoad((oldRoad) => {
     //setCount((count) => count+1);
     //console.log(count);
     return  [...oldRoad,{id:count, start:start, end:end, review:review}]
    });
    setValue("start", "");
    setValue("end", "");
    setValue("review", "");
    console.log(road);
  };
 
  return (
    <>
      <Wrapper>
      <Title>후기 작성</Title>
        <Banner>
          <Board>
          <CreateForm>
            <MapBox 
            //id="map" 
            //ref = {container} 
            >
              { photo ? (
              <Img
                  src={require(`../images/7.png`)}
                />
            ):null
            }
            </MapBox>
          </CreateForm>
            <CreateForm onSubmit={handleSubmit(onValid)} >
            <RoadBox>
              <P>
                <Label >출발지 </Label>
                <Input
                  id="start"
                  type="text"
                  placeholder="출발지를 입력하세요"
                  {...register("start", {
                    required: "출발지를 입력하세요",
              })}
            />
              </P>
              <P>  
                <Label> 도착지 </Label>
                <Input
                  id="end"
                  type="text"
                  placeholder="도착지를 입력하세요."
                  {...register("end", {
                    required: "도착지를 입력하세요",
                  })}
                />
              </P>
                <Label> 후기 </Label>
                <ReviewInput
                  id="review"
                  type="text"
                  placeholder="후기를 작성하세요."
                  {...register("review", {
                    required: "후기를 작성하세요",
                  })}
                />
              </RoadBox>
              <Button onClick ={onclick}> 후기 저장</Button>
            </CreateForm>   


          </Board>
        </Banner>
      </Wrapper>
    </>
  );
}
export default Road;
