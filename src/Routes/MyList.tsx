import { motion } from "framer-motion";
import { styled } from "styled-components";

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

function MyList(){
    //1) 백에서 가져온 "경로 데이터"라고 가정
    const myRoad = [{id:"1" ,start: "숙대",end:"한강"}, {id:"2", start: "용산",end: "남산"}, {id:"3",start: "롯데타워",end: "양화대교"}];

    return (
       <>
        <Wrapper>
            <Box>
              <Ul>
                {myRoad.map( (road) => {
                    return(
                      <>
                        <Li >{road.id} : 출발지- { road.start }  , 도착지- { road.end }</Li>
                        <hr></hr>
                      </>
                    );
                })}
            </Ul>
            </Box>
        </Wrapper>
       </>
    );
}
export default MyList;