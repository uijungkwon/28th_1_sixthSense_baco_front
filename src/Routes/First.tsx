import { motion, AnimatePresence,useScroll } from "framer-motion";
import { styled } from "styled-components";
import { useEffect,useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isNickNameAtom } from "../atoms";
import { useQuery } from "react-query";
const Container = styled.div`
  height: 100vh;
  padding: 0px 20px;
  max-width: 1000px; // 탭의 "최대 길이 " 정하기  - 탭의 너비 구하기 => 페이지 스타일링
  margin: 0 auto;
  background-color:whitesomke;  // 마이페이지 중앙 사각형
  border-radius: 30px;
  //box-shadow: 0px 2px 4px black;
`;
const Box = styled(motion.div)`
  background: #c4f0fadf;
  width: 1000px;
  height: 70px;
  margin-left:-20px;
  margin-top:40px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;

`;
const FontBox = styled.div`
  width:1000px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: flex-start;
  //background-color: #f800c2d2;
  text-align: center;
  border-radius: 10px;
  //margin-right: ;

`;
const Font = styled.span`
  width: 215px;
  font-size: 18px;
  font-weight: 550;
  margin-left:45px;

  //background-color: #fabbefd2;
  color: black;
  a {
    display: block;
  }
  padding: 15px;
  border-radius: 10px;
`;
const Overlay = styled(motion.div)`
  position:fixed;
  opacity:0;
  top:0;
  width:3000px;
  margin-left: -300px;
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
const ReviewBox = styled.div`
  background-color:#c4f0fadf;
  border-radius:30px;
  height: 100px;
  width:540px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //margin-top: 50px;
  padding: 10px 10px 10px 10px;
  position:absoulte;
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

//back이랑 연동!
const BASE_URL = "https://port-0-baco-server-eg4e2alkhufq9d.sel4.cloudtype.app";
interface IReview {
  review_id:number; 
  startPlace: string;
  endPlace:string;
  date:number[];
  hashtag:string;
  nickname: string; //추가할 값!

}

interface InfoData{
 content:string;
 mapUrl: string;
}


function First(){

  function fetchReviewBoard() {
    return fetch(`${BASE_URL}/Review/reviews?hashtag=2`)
    .then((response) =>
      response.json() //"힐링 태그" 목록 전체 가져오기
    );
  }
  
  function fetchReviewInfo(review_id: string ) { //목록 클릭 시 상세 데이터 조회
    return fetch(`${BASE_URL}/Review/detail/${review_id}`).then((response) =>
      response.json()
    );
  }
    const nickname = useRecoilValue(isNickNameAtom);

    /*
    const data = [
        {"id":1, "name":`${name}`, "출발":"숙명여자대학교" , "도착":"여의도 안내센터" , 
        "후기":"자전거 길이 잘 구현되어 있어요. 길 옆에 나무들이 많아서 기분이 좋아져요! 중간에 차도와 가까워서 조금 위험한 부분도 있지만 전체적으로 자연과 가까운 코스입니다!" , 
        "작성일":"2023.07.14"},
        { "id":2,"name":`${name}`, "출발":"서울 특별 시청" , "도착":"경복궁" , 
        "후기":"사람이 많아서 길이 복잡하긴 하지만 눈호강이 엄청나요! 특히 경복궁이 너무 예쁘고 도로가 넓은 편이라 자전거 타기에도 편해요" , 
        "작성일":"2023.07.20" , 
        },
        
        {
            "id":7,"name":"솔방울", "출발":"서울역 6번 출구" , "도착":"서촌 마을" , 
            "후기":"숭례문으로 시작해 덕수궁, 시청, 광하문과 경복궁까지 서울의 명소를 지나서 너무 좋아요. 자전거 전용 도로가 있어서 맘편히 달릴수 있어서 더 좋아요!" , 
            "작성일":"2023.07.28" ,  
        },
        {
            "id":11,"name":`${name}`, "출발":"키에리" , "도착":"숙명여대" , 
            "후기":"주변이 산뷰라서 눈이 정화되는 느낌이에요. 짧은코스라서 힘들지 않고 가는길에 맛집이 많이 있어서 놀거리도 많아요!" , 
            "작성일":"2023.08.09" ,  
        },
    
        ];
        */
    
    const {  isLoading, data: reviewData } = useQuery<IReview[]>("allReview",fetchReviewBoard);
      console.log(reviewData);
    
    const [id, setId] = useState("0");
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
        ['info', id],
        () => fetchReviewInfo(id)
      );   

    const bigRoadMatch = useRouteMatch<{ review_id: string }>("/Review/First/:review_id");
    const clickedBoxOne = bigRoadMatch?.params.review_id && reviewData?.find((item) => item.review_id === +bigRoadMatch.params.review_id);
    const history = useHistory();

    const onOverlayClick = ()=> history.push("/Review/First/");
    const {scrollY} = useScroll();

    const onBoxClicked = (review_id: string)=>{
        history.push(`/Review/First/${review_id}`);
        console.log(infoData);
      };
    const rarr = "===>"
    return (
        <>
            <Container >
            <AnimatePresence>
            <ul>
                    <li>{reviewData?.map((item) => (
                    <Box 
                    layoutId={item.review_id +""}
                    key={item.review_id}
                    onClick = {()=>
                      {onBoxClicked(item.review_id+"")
                      setId(item.review_id+"")}// 바꾸기!
                     }
                    >
                     <FontBox>
                            <Font> {item.nickname}</Font>
                            <Font> {item.startPlace}{rarr}{item.endPlace}</Font>
                            <Font>{item.date[0] }.{item.date[1] }.{item.date[2] }</Font>    
                        </FontBox>
                    </Box>
                    ))}</li>
                </ul>
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
                layoutId={bigRoadMatch.params.review_id+""}
                style = {{top:scrollY.get() + 100, }}
              >
              
              {
                clickedBoxOne && 
                (<>
                <div style={{marginTop:"10px",width: "550px", height: "420px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <iframe title="Naver Map" src= {infoData?.mapUrl} width="620px" height="480px" style={{ border: "none", overflow: "hidden" }}></iframe>
                </div>
                
                <ReviewBox>
                <Title > 후기 </Title>
                  <H1>{infoData?.content}</H1>
                </ReviewBox>
                </>)
               }
              </BigBox>
            </>
            ) : null}
            
          </AnimatePresence>



            </Container>
        </>
        
    );

}
export default First;