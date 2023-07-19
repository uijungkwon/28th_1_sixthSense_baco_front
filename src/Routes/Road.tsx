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
import { useEffect, useState } from "react";
//배경색 배경 길이 정하기
import { Map } from "react-kakao-maps-sdk";
import { useHistory } from "react-router-dom";


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
  width: 500px;
  height: 450px;
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
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    margin-bottom:40px;
`;
const P = styled.p`
    align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    flex-direction: column;
    margin-bottom:10px;
    //margin-top:50px;
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
  font-size:25px;
  color:black;
  margin-left:30px;
  margin-bottom:30px;
`;
interface IForm { //start 값의 타입
  start: string;
  end: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}
function Road() {

  //1) 경로 저장 버튼 눌렀을 때
  const mapBtnclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name },
    } = event;
    const target = {name};  //버튼 정보가 넘어가야함
    console.log("경로가 저장되었습니다.");
  }

  //2) 경로 추천 버튼 눌렀을 때
  const roadbtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name }, 
  } = event;
    const target = {name};  
    console.log(name);
  }
  //3) samle 지도 보여주는 코드 
  
  useEffect(() => {

    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = { //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng( 37.54365822551167,  126.97226557852383), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  }, []);



  const { register, handleSubmit, setValue,getValues, formState: { errors,isDirty }, watch} =useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {
      start:"",
      end:""
    },
  });
  const history = useHistory();

  const onValid = ({start,end}: IForm) => {
    console.log(start,"and", end);
    history.push('/');
  };
 
  return (
    <>
      <Wrapper>
      <Title>따릉이 경로 추천</Title>
        <Banner>
          <Board>
          <CreateForm>
            <MapBox id="map" >
            
            </MapBox>
            <Button  onClick = {mapBtnclick}>경로 저장</Button>
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
                    minLength: {
                    value: 8,
                    message: "출발지를 입력하세요.",
                  },
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
                    minLength: {
                      value: 7,
                      message: "도착지를 입력하세요"
                    } ,
                  })}
                />
              </P>
              <P>
                <Label> 후기 </Label>
                <Input
                  id="review"
                  type="text"
                  placeholder="후기를 작성하세요."
                  {...register("end", {
                    required: "후기를 작성하세요",
                    minLength: {
                      value: 7,
                      message: "후기를 작성하세요"
                    } ,
                  })}
                />
              </P>
             
              </RoadBox>
              <Button onClick = {roadbtnClick}> 후기 저장</Button>
            </CreateForm>            
          </Board>
        </Banner>
      </Wrapper>
    </>
  );
}
export default Road;
