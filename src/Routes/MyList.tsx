import { motion, AnimatePresence,useScroll } from "framer-motion";
import { styled } from "styled-components";
import { useEffect,useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { contentState } from "./atoms";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isLoginAtom, roadState } from "../atoms";
import { useQuery } from "react-query";
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
  width:2000px;
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
const Strong  = styled.strong`
  font-weight:bold;

`;
//back이랑 연동!
const BASE_URL = "https://port-0-baco-server-eg4e2alkhufq9d.sel4.cloudtype.app";
interface IReview {  //백에서 주는 목록 string
  review_id:number; //해당 목록 review_id 가져옴
  startPlace: string;
  endPlace:string;
  nickname:string;
  date:number[];
  hashtag:string;
}

interface InfoData{
 content:string;
 mapUrl: string;
}
//목록 하나 상세보기 


function MyList(){

const userID = useRecoilValue(isLoginAtom); //로그인 할 때 받아온 id 값 

function fetchReview() {
  return fetch(`${BASE_URL}/Mypage/My-reviews/${userID}`)
  .then((response) =>
    response.json() //후기 목록 전체 가져오기
  );
}

function fetchReviewInfo(review_id: string ) { //데이터 있는걸 가져오기!
  return fetch(`${BASE_URL}/Review/detail/${review_id}`).then((response) =>
    response.json()
  );
}
    //1)데이터 가져오기
    const {  isLoading, data: reviewData } = useQuery<IReview[]>("allReview",fetchReview);
    //console.log(reviewData);

    const [id, setId] = useState("0");
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
      ['info', id],
      () => fetchReviewInfo(id)
    );
   

    const history = useHistory();
    //1-1) 하나의 박스(저장 경로) 를 선택했을 때 나타나는 동작 설정  
    const onBoxClicked = (review_id: string)=>{
      history.push(`/Mypage/MyList/${review_id}`);
      console.log(infoData);
    };
    
    const bigRoadMatch = useRouteMatch<{ review_id: string }>("/Mypage/MyList/:review_id");
    const clickedBoxOne = bigRoadMatch?.params.review_id && reviewData?.find((item) => item.review_id === +bigRoadMatch.params.review_id);
    
    const onOverlayClick = ()=> history.push("/Mypage/MyList/");
    const {scrollY} = useScroll();
    const rarr = "===>"
    return (
   <>
    <Wrapper>
      <AnimatePresence>
      {isLoading? (<div style = {{color:"black"}}> loading....</div>) 
      
      : (
        <>
          <Ul>
            {reviewData?.map((review) => (
            <li>
              <Box 
                layoutId={review.review_id+""}
                key={review.review_id}
                onClick = {()=>
                   {onBoxClicked(review.review_id+"")
                   setId(review.review_id+"")}// 바꾸기!
                  }
              >
               <h1> {review.startPlace} <Strong>{rarr}</Strong>  {review.endPlace} </h1>
            </Box> 
            </li>
            ))}
    
        </Ul>
        </>
        )}
        
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
          <FontBox>
            <Title > 후기 </Title>
            <H1>{infoData?.content}</H1>
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