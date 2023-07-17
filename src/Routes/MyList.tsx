import { motion } from "framer-motion";
import { styled } from "styled-components";
import PropTypes from 'prop-types';
import { useEffect,useRef, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import Road from "./Road";


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
declare global {
  interface Window {
    kakao: any;
  }
}
function MyList(){
      //2) 모달 박스 띄우기 위해 해당 버튼을 눌렀는지 확인하는 코드
      const [isOpen, setIsOpen] = useState(false);
      const openModalHandler = () => {
        console.log()
        setIsOpen(!isOpen);
      };

    //1) 백엔드에서 가져온 데이터라고 가정
    const myRoad = [{id:"1" ,start: "숙대",end:"한강"}, {id:"2", start: "용산",end: "남산"}, {id:"3",start: "롯데타워",end: "양화대교"}];
    const [clicked, setClicked] = useState("");


    return (
       <>
        <Wrapper>
            <Box >
              <Ul>
              {myRoad.map( (road) => {
                    return(//클릭한 번호 정보 넘겨 받아야함
                      <>
                        <Li  >
                          <Button id = {road.id} onClick = {openModalHandler}>{road.id} : 출발지- { road.start }  , 도착지- { road.end }</Button>
                          
                          </Li>
                        
                      </>
                    );
                    
                })}
            </Ul> 
            {isOpen ? 
                (
                <ModalOverlay onClick = {openModalHandler}>
                  <ModalBox>

                  </ModalBox>
                </ModalOverlay>
                )
                 : null}
            </Box>
        </Wrapper>
       </>
    );
}
export default MyList;
/*

alphaBtn.map((item) => {
          return (
            <button
              onClick={(e) => {
                setAlphabet(e.target.value);
              }}
              value={item}
            >
              {item}
            </button>
          );
        })


{myRoad.map( (road) => {
                    return(//클릭한 번호 정보 넘겨 받아야함
                      <>
                        <Li  >
                          <Button key = {road.id} onClick = {openModalHandler}>{road.id} : 출발지- { road.start }  , 도착지- { road.end }</Button>
                          
                          </Li>
                        
                      </>
                    );
                    
                })}

});
                
*/