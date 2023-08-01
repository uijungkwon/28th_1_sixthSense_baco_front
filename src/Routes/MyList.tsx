import { motion, AnimatePresence,useScroll } from "framer-motion";
import { styled } from "styled-components";
import { useEffect,useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { contentState } from "./atoms";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { roadState } from "../atoms";
import { useQuery } from "react-query";
import { fetchCoins, fetchRoads } from "../api";
import axios from "axios";

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

interface IRoad {
  content: string;
  mapUrl: string; //review_id 필요?
}
function fetchItems() {
  return fetch("https://port-0-baco-server-eg4e2alkhufq9d.sel4.cloudtype.app/Mypage/My-reviews")
  .then((response) =>
    response.json() //후기 목록 전체 가져오기
  );
}

function MyList(){
      //1)데이터 가져오기
      const {  isLoading, data:RoadData } = useQuery<IRoad>("Road", fetchItems);

      console.log(RoadData);
      //const testName = Coindata?.slice(0,1).map((coin) => coin.id);
      //console.log(testName);

      
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
    };
      
  //recoil 사용 선언부!! id, start, end , review 가져옴
    const [road, setRoad] = useRecoilState(roadState);
    //예비 데이터 구현
    //예비 데이터 안에 있는 id랑 매칭 시키고 있음 
    const [reviewData, setReviewData] = useState({});
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

    //나의 후기 페이지에 들어왔을때, 백에서 목록을 한번에 받아옴
    /*
    useEffect(() => {//userID가 필요없다고 하여, 정보 전송 없이 GET 만함
      axios.get('https://port-0-baco-server-eg4e2alkhufq9d.sel4.cloudtype.app/Mypage/My-reviews')
    .then((response) => {//응답으로 해당 장소 "mapURL" 받아오기
     console.log(response);
    })
    .catch(function (error) {
      //오류 발생 시 실행될 문장
      console.log(error);
      console.log("서버에서 나의 후기목록을 불러오는데 실패했습니다.");
    })
    .then(function() {
        // 항상 실행
    });
    }, []);
*/
    const bigRoadMatch = useRouteMatch<{ itemId: string }>("/Mypage/MyList/:itemId");

    const clickedBoxOne = bigRoadMatch?.params.itemId && data.find((item) => item.id === +bigRoadMatch.params.itemId);
    const clickedBoxTwo = bigRoadMatch?.params.itemId && road.find((item) => item.id === +bigRoadMatch.params.itemId);
    //백이랑 연결하면 data => RoadData로 변경하면됨

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
                <div style={{ width: "620px", height: "720px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <iframe title="Naver Map" src=" https://port-0-baco-server-eg4e2alkhufq9d.sel4.cloudtype.app/mapmap" width="100%" height="100%" style={{ border: "none", overflow: "hidden" }}></iframe>
                </div>
                <FontBox>
                  <Title > 후기 </Title>
                  <H1>{clickedBoxOne.후기}</H1>
                </FontBox>
                </>)
              }
              {
                clickedBoxTwo && 
                (<>
                <div style={{ width: "620px", height: "720px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <iframe title="Naver Map" src=" https://port-0-baco-server-eg4e2alkhufq9d.sel4.cloudtype.app/mapmap" width="100%" height="100%" style={{ border: "none", overflow: "hidden" }}></iframe>
                </div>
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
/*
<Img
                  src={require(`../images/${clickedBoxOne.id}.png`)}
                />
*/