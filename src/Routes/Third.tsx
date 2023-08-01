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

const Ul = styled.ul`
    color:black;
`;
const Overlay = styled(motion.div)`
  position:fixed;
  opacity:0;
  top:0;
  margin-left:-300px;
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
function Third(){
    const name = useRecoilValue(isnameAtom);
    const data = [
        {"id":5,"name":`${name}`, "출발":"월드컵 경기장" , "도착":"숙명여자대학교" , 
        "후기":" 중간에 한강을 지나갈때 풍경은 좋지만, 거의 대부분 아파트 단지 풍경이라 볼게 없어요. 그리고 3시간 정도의 코스이니 매우 힘듭니다.특히 한강 다리를 건널때 고비에요. ", 
        "작성일":"2023.07.27"
  
        },
        {"id":6,"name":`${name}`,"출발":"남산타워" , "도착":"숙명여자대학교" , 
        "후기": "20분 정도의 코스라 짧긴 하지만 경사가 높은 곳이 많아 너무 힘들어요. 특히 남산 타워에서 내려올 때 내리막길이여도 경사가 급해서 너무 위험했어요.", 
        "작성일":"2023.07.28"
        },
        {"id":9,"name":"솔방울","출발":"서울숲" , "도착":"느티나무집" , 
        "후기": "서울 중심부에 비하면 사람이 적어서 여유롭게 탈 수 있고 나무도 훨씬 많아요.하지만 소요시간이 거의 2시간 정도되고 오르막길과 내리막길이 끝없이 이어져서 너무 힘들어요. 체력이 약한사람은 비추입니다.", 
        "작성일":"2023.07.29"
        },
        {"id":10,"name":"따롱이","출발":"뚝섬역 " , "도착":"공릉역" , 
        "후기": "평지가 이어져서 자전거 타기에는 나쁘지않아요. 다만 풍경이 거의 변하지 않아서 지루한 느낌이 많아요. 그리고 바로 옆에 동부간선 도로가 있어서 차가 많이 지나다녀서 소음이 조금 심해요.", 
        "작성일":"2023.07.31"
        },
    ];
    const bigRoadMatch = useRouteMatch<{ itemId: string }>("/Review/Third/:itemId");
    const clickedBoxOne = bigRoadMatch?.params.itemId && data.find((item) => item.id === +bigRoadMatch.params.itemId);
    const history = useHistory();
    const onOverlayClick = ()=> history.push("/Review/Third/");
    const {scrollY} = useScroll();
    const onBoxClicked = (itemId: number)=>{
        history.push(`/Review/Third/${itemId}`);
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
                  src={require(`../images/${clickedBoxOne.id}.png`)}
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
        //style={{ paddingRight:50}}

    );

}
export default Third;