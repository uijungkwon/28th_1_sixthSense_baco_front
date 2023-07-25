
import { useEffect, useRef, useState } from "react";
import Review from "./Review";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { IGps, gpsState, roadState } from "../atoms";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}
interface Iresult {
  address_name: string;
  address: string;
  address_type: string;
  road_address_name:string;
  x: string;
  y: string;


}
const Wrapper = styled(motion.div)`
  height: 130vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  background-color:white;
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
const Label = styled.label`
  background-color: #bbe1fad2;
  border-radius: 10px;
  width:15%;
  font-size:25px;
  color:black;
  margin-left:50px;
  margin-top:20px;
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
const Button = styled.button`
		width: 30px;
    height:30px;
		background-color: #ffff81;
		border: none;
		border-radius: 10px;
		font-size: 15px;
		color: ${(props) => props.theme.accentColor};
    margin-top: 70px;     
    margin-left:200px;

`;
const P = styled.p`
    //align-items: center;
		//justify-content: center;
		color: ${(props) => props.theme.textColor};
    //flex-direction: column;
    //margin-bottom:10px;
    margin-top:20px;
`; 
const Board = styled(motion.div)`
  display: grid;
  margin-top:-400px;
  grid-template-columns: 1fr 1fr;
`;


function LandingPage(){
////myRoad랑 합치기
///페이지 들어갈 때마다 새로고침 되면서 console 창에 출력 됨
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  const road = useRecoilValue(roadState);//저장되어있는 "출발지", "도착지"
  const [state,setState] = useState("서울특별시 용산구 청파로47길 100");

  const [gps,setGps] = useRecoilState(gpsState);

  const [value, setValue] = useState("");
  const [end, setEnd] = useState("");
  
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
    setState(value);
  };

  const onChange2 = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setEnd(value);
  };

  const onSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(end);
    setState(end);
  };
    // 1) 카카오맵 불러오기
    useEffect(() => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701+"", 126.570667+""),
          level: 3,
        };
        
        setMap(new window.kakao.maps.Map(container, options));
        setMarker(new window.kakao.maps.Marker());
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(`${state}`, function(result, status ) {

          // 정상적으로 검색이 완료됐으면 
           if (status === kakao.maps.services.Status.OK) { //좌표 타입 변환
            const coords = new kakao.maps.LatLng(parseFloat(result[0].y),parseFloat(result[0].x ));
      
              // 결과값으로 받은 위치를 마커로 표시합니다
              const marker = new kakao.maps.Marker({
                  map: map,
                  position: coords
              });
      
              // 인포윈도우로 장소에 대한 설명을 표시합니다
              const infowindow = new kakao.maps.InfoWindow({
                  content: '<div style="width:150px;text-align:center;padding:6px 0; color:black;">내가 찾는 장소!!</div>'
              });
              infowindow.open(map, marker);
      
              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              //map.setCenter(coords);
              map?.panTo(coords);
              marker.setMap(map);
              setGps((old) => {
                return  [...old, {x:result[0].x, y:result[0].y, } ]
               });
              console.log(gps);
            } 
          
        });    
      });
    }, [state]);

  return(<>
    <Wrapper>
      <Board>
      <MapBox id="map" ></MapBox>
      <RoadBox>
        <form onSubmit={onSubmit}>
          <input  
           onChange={onChange} 
           value={value} 
           placeholder="입력하세요">

           </input>
           <button>출발지 제출</button>
        </form>

        <form onSubmit={onSubmit2}>
          <input  
           onChange={onChange2} 
           value={end} 
           placeholder="입력하세요">
           </input>
           <button>도착지 제출</button>
        </form>

          </RoadBox>
      </Board>
    </Wrapper> 
  </>);
 }

export default LandingPage;
/*
onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    setState(e.target.value);
                }}
*/