import { motion, AnimatePresence,useScroll } from "framer-motion";
import { styled } from "styled-components";
import { useEffect,useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { contentState } from "./atoms";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { roadState } from "../atoms";

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color:white;
`;

const Box = styled(motion.div)`
  background: #c4f0fadf;
  width: 500px;
  height: 70px;
  margin-top:40px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: black;
  
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;

const Ul = styled.ul`
    color:black;
`;

////"경로 모달 박스 만들기!!"
const Overlay = styled(motion.div)`
  position:fixed;
  opacity:0;
  top:0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.5);
`;
const BigBox = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 70vh;
  background-Color: whitesmoke;
  border-radius:20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding:5px 5px 5px 5px;
`;
const Div = styled.div`
  background-color: whitesmoke;
  margin-top: -10px;
  margin-bottom:60px;
  width:500px;
  height:300px;
  :hover {
    cursor: pointer;
  }
`;
const FontBox = styled.div`
  background-color:#c4f0fadf;
  border-radius:30px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //margin-top: 50px;
  padding: 10px 10px 10px 10px;
`;
const Img = styled.img`
  width:100%;
  height:100%;
`;
const Title = styled.h1`
  font-size:25px;
  font-weight: bold;
  color:black;
`;
const H1 = styled.h1`
  margin-top:15px;
  font-size:17px;
  color:black;
`;
function MyList(){
      //2) 모달 박스 띄우기 위해 해당 버튼을 눌렀는지 확인하는 코드
      const [isOpen, setIsOpen] = useState(false);
      const openModalHandler = () => {
        console.log()
        setIsOpen(!isOpen);
      };

    //1) 백엔드에서 가져온 데이터라고 가정
    const history = useHistory();
    //1-1) 하나의 박스(저장 경로) 를 선택했을 때 나타나는 동작 설정  
    const onBoxClicked = (itemId: number)=>{
      history.push(`/Mypage/MyList/${itemId}`);
    }
      
  //recoil 사용 선언부!! id, start, end , review 가져옴
    const [road, setRoad] = useRecoilState(roadState);
    const data = [
      {"id":1, "출발":"숙명여자대학교" , "도착":"여의도 안내센터" , 
      "후기":"자전거 길이 잘 구현되어 있어요. 길 옆에 나무들이 많아서 기분이 좋아져요! 중간에 차도와 가까워서 조금 위험한 부분도 있지만 전체적으로 자연과 가까운 코스입니다!" , 
      "타입":"힐링코스"},
      { "id":2, "출발":"서울 특별 시청" , "도착":"경복궁" , 
      "후기":"사람이 많아서 길이 복잡하긴 하지만 눈호강이 엄청나요! 특히 경복궁이 너무 예쁘고 도로가 넓은 편이라 자전거 타기에도 편해요" , 
      "타입":"힐링코스" , 
      },
      {"id":3, "출발":"홍익대학교" , "도착":"숙명여자대학교" , 
      "후기":" 주변에 맛집, 먹거리가 많아서 놀기에 좋아요. 그런데 차도가 많이나와서 약간 위험한것 같아요. 그리고 유동인구가 많아 제대로 달리지 못할 때도 있어요", 
      "타입":"무난코스",
      },
      {"id":4, "출발":"어린이 대공원" , "도착":"서울숲" , 
      "후기":" 여기는 풍경이 강점이에요. 나무들이 많아서 길을 달리면서 맑은 공기를 마실 수 있어요. ", 
      "타입":"무난코스",

      },
      {"id":5, "출발":"월드컵 경기장" , "도착":"숙명여자대학교" , 
      "후기":" 중간에 한강을 지나갈때 풍경은 좋지만, 거의 대부분 아파트 단지 풍경이라 볼게 없어요. 그리고 3시간 정도의 코스이니 매우 힘듭니다.특히 한강 다리를 건널때 고비에요. ", 
      "타입":"비추코스"

      },
      {"id":6,"출발":"남산타워" , "도착":"숙명여자대학교" , 
      "후기": "20분 정도의 코스라 짧긴 하지만 경사가 높은 곳이 많아 너무 힘들어요. 특히 남산 타워에서 내려올 때 내리막길이여도 경사가 급해서 너무 위험했어요.", 
      "타입": "비추코스"
      },
    ];
    const bigRoadMatch = useRouteMatch<{ itemId: string }>("/Mypage/MyList/:itemId");

    const clickedBoxOne = bigRoadMatch?.params.itemId && data.find((item) => item.id === +bigRoadMatch.params.itemId);
    const clickedBoxTwo = bigRoadMatch?.params.itemId && road.find((item) => item.id === +bigRoadMatch.params.itemId);

    const onOverlayClick = ()=> history.push("/Mypage/MyList/");
    const {scrollY} = useScroll();


    return (
       <>
        <Wrapper>
            <AnimatePresence>
              
                <Ul>
                  <li>{data.map((item) => (
                  <Box 
                   layoutId={item.id +""}
                   key={item.id}
                   onClick = {()=> onBoxClicked(item.id)}
                   >
                   [ {item.id} ]  출발지: {item.출발} , 도착지: {item.도착} 
                  </Box>
                ))}</li>
                <li>{road.map((item) => (
                  <Box 
                   layoutId={item.id+""}
                   key={item.id}
                   onClick = {()=> onBoxClicked(item.id)}
                   >
                   [{item.id} ] | 출발지: {item.start}  ,  도착지: {item.end} 
                  </Box>
                ))}</li>
                </Ul>
                
            </AnimatePresence>

            <AnimatePresence>
            
            {bigRoadMatch ? (
              <>
              <Overlay 
                onClick = {onOverlayClick}
                exit = {{opacity:0}}
                animate = {{opacity: 1}}
              />
              <BigBox
                layoutId={bigRoadMatch.params.itemId+""}
                style = {{top:scrollY.get() + 100, }}
              >
              
              {
                clickedBoxOne && 
                (<>
                <Div >
                  <Img
                  src={require(`../images/${clickedBoxOne.id}.png`)}
                />
                </Div>
                <FontBox>
                  <Title > 후기 </Title>
                  <H1>{clickedBoxOne.후기}</H1>
                </FontBox>
                </>)
              }
              {
                clickedBoxTwo && 
                (<>
                <Div >
                <Img
                  src={require(`../images/${clickedBoxTwo.id}.png`)}
                />
                </Div>
                <FontBox>
                   <Title>후기</Title>
                  <H1> {clickedBoxTwo.review} </H1>
                </FontBox>
                </>)
              }
              </BigBox>
            </>
            ) : null}
            
          </AnimatePresence>
        </Wrapper>
       </>
    );
}
export default MyList;
