import { motion, AnimatePresence,useScroll } from "framer-motion";
import { styled } from "styled-components";
import PropTypes from 'prop-types';
import { useEffect,useRef, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import Road from "./Road";
import { useHistory, useRouteMatch } from "react-router-dom";
import { isConstructorDeclaration } from "typescript";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled(motion.div)`
  //height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //overflow-x: hidden;
  background-color:white;
`;
//sample로 어떻게 만들지 구성!!!
const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background: #aeeaf8;
  width: 400px;
  height: 70px;
  //margin-right:120px;
  //margin-left:120px;
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
const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};




/*
const Box = styled(motion.div)`
  background: rgba(255, 255, 255, 0.5);
  width: 600px;
  height: 400px;
  margin-right:120px;
  margin-left:120px;
  margin-top:40px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;
*/
const ListBox = styled(motion.div)`
  width: 100px;
  height: 100px;

`;
const Ul = styled.ul`
    color:black;
`;
const Li = styled.li`
    font-size:23px;
    color:black;
    &:hover{
	  color: blue; //목록에 가져다 대면 파란색으로 변경
  }
`;
const Button = styled.button`
		height:30px;
    width:500px;
		background-color: #b3f4ff;
		border: none;
		border-radius: 10px;
		font-size: 28px;
		color: ${(props) => props.theme.accentColor};
    margin-bottom:10px;   
    align-items: center;
  justify-content: center;
  flex-direction: column;
`;
////"경로 모달 박스 만들기!!"
const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
`;
const ModalOverlay = styled.div`
  width: 100%;
  height: 140%;
  position: fixed;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled(motion.div)`
  width: 500px;
  height: 400px;
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  margin-top:-100px;

`;
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
  height: 80vh;
  background-Color: whitesmoke;
  border-radius:20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`;
const H1 = styled.h1`


`;
interface IRoad {
  id: string;
  start:string;
  end: string;
}
function MyList(){
      //2) 모달 박스 띄우기 위해 해당 버튼을 눌렀는지 확인하는 코드
      const [isOpen, setIsOpen] = useState(false);
      const openModalHandler = () => {
        console.log()
        setIsOpen(!isOpen);
      };

    //1) 백엔드에서 가져온 데이터라고 가정
    const history = useHistory();
    const myRoad = [{id:1 ,start: "숙대입구",end:"한강"}, {id:2,start: "성수역",end:"용산역"}, {id:3,start: "뚝섬",end:"남산"},];

    //1-1) 하나의 박스(저장 경로) 를 선택했을 때 나타나는 동작 설정  
    const onBoxClicked = (itemId: number)=>{
      history.push(`/Mypage/MyList/${itemId}`)
      console.log(`${itemId}` );
    }

    const bigRoadMatch = useRouteMatch<{ itemId: string }>("/Mypage/MyList/:itemId");
    const onOverlayClick = ()=> history.push("/Mypage/MyList/");
    const {scrollY} = useScroll();
    const clickedBox = bigRoadMatch?.params.itemId && myRoad.find((item) => item.id === +bigRoadMatch.params.itemId);
    console.log(clickedBox); 
    
    return (
       <>
        <Wrapper>
            <AnimatePresence>
              
                <Ul>
                  <li>{myRoad.map((item) => (
                  <Box 
                   layoutId={item.id + ""}
                   key={item.id}
                   onClick = {()=> onBoxClicked(item.id)}
                   >
                  id : {item.id}
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
                layoutId={bigRoadMatch.params.itemId}
                style = {{top:scrollY.get() + 100, }}
              >
              {
                clickedBox && 
                (<>
                <h1 style = {{color:"black"}}>출발지: {clickedBox.start} , 도착지 :{clickedBox.end}</h1>  
                </>)
              }
              <H1 color = "red">후기 남기기</H1>
              </BigBox>
            </>
            ) : null}
            
          </AnimatePresence>
        </Wrapper>
       </>
    );
}
export default MyList;
