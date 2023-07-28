import { motion, AnimatePresence,useScroll } from "framer-motion";
import { styled } from "styled-components";
import { useEffect,useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isnameAtom } from "../atoms";
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
  width: 160px;
  font-size: 18px;
  font-weight: 400;

  margin-left:70px;

  //background-color: #fabbefd2;
  color: black;
  a {
    display: block;
  }
  padding: 15px;
  border-radius: 10px;
`;
const Ul = styled.ul`
    color:black;
`;
const Overlay = styled(motion.div)`
  position:fixed;
  opacity:0;
  top:0;
  margin-left:-230px;
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
const ReviewBox = styled.div`
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
function Second(){
    const name = useRecoilValue(isnameAtom);
    const data = [
        {"id":3, "name":`${name}`,"출발":"홍익대학교" , "도착":"숙명여자대학교" , 
        "후기":" 주변에 맛집, 먹거리가 많아서 놀기에 좋아요. 그런데 차도가 많이나와서 약간 위험한것 같아요. 그리고 유동인구가 많아 제대로 달리지 못할 때도 있어요", 
        "작성일":"2023.07.21"
        },
        {"id":4, "name":`${name}`,"출발":"어린이 대공원" , "도착":"서울숲" , 
        "후기":" 여기는 풍경이 강점이에요. 나무들이 많아서 길을 달리면서 맑은 공기를 마실 수 있어요. ", 
        "작성일":"2023.07.24",},
        {"id":8, "name":"탕후루","출발":"광화문역 5번출구" , "도착":"동대문역" , 
        "후기":" 청계천 옆을 따라 달리는 코스라서 풍경은 좋아요. 다만 경로에 번화가가 많아서 횡단보도가 자주나와 계속 멈춰야하는것이 단점이에요 ", 
        "작성일":"2023.07.24",},
    ];
    const bigRoadMatch = useRouteMatch<{ itemId: string }>("/Review/Second/:itemId");
    const clickedBoxOne = bigRoadMatch?.params.itemId && data.find((item) => item.id === +bigRoadMatch.params.itemId);
    const history = useHistory();
    const onOverlayClick = ()=> history.push("/Review/Second/");
    const {scrollY} = useScroll();
    const onBoxClicked = (itemId: number)=>{
        history.push(`/Review/Second/${itemId}`);
      }
    return (
        <>
            <Container >
            <AnimatePresence>
                <ul>
                    <li>{data.map((item) => (
                    <Box 
                    layoutId={item.id +""}
                    key={item.id}
                    onClick = {()=> onBoxClicked(item.id)}
                    >
                     <FontBox>
                            <Font>[{item.id}] {item.name}</Font>
                            <Font> {item.출발}~{item.도착}</Font>
                            <Font>{item.작성일}</Font>    
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
                layoutId={bigRoadMatch.params.itemId+""}
                style = {{top:scrollY.get() + 100, }}
              >
              
              {
                clickedBoxOne && 
                (<>
                <Div >
                  <Img
                  src={require(`../images/${clickedBoxOne.id}.png`).default}
                />
                </Div>
                <ReviewBox>
                  <Title > 후기 </Title>
                  <H1>{clickedBoxOne.후기}</H1>
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
export default Second;