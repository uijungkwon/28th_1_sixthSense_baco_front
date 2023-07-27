import { motion } from "framer-motion";
import { styled } from "styled-components";

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
  h2{
    text-align:left;
  }
`;

const Ul = styled.ul`
    color:black;
`;

function First(){
    const data = [
    {"id":1, "출발":"숙명여자대학교" , "도착":"여의도 안내센터" , 
    "후기":"자전거 길이 잘 구현되어 있어요. 길 옆에 나무들이 많아서 기분이 좋아져요! 중간에 차도와 가까워서 조금 위험한 부분도 있지만 전체적으로 자연과 가까운 코스입니다!" , 
    "작성일":"2023.07.14"},
    { "id":2, "출발":"서울 특별 시청" , "도착":"경복궁" , 
    "후기":"사람이 많아서 길이 복잡하긴 하지만 눈호강이 엄청나요! 특히 경복궁이 너무 예쁘고 도로가 넓은 편이라 자전거 타기에도 편해요" , 
    "작성일":"2023.07.20" , 
    },
    ];
    return (
        <>
            <Container >
                <ul>
                    <li>{data.map((item) => (
                    <Box 
                    layoutId={item.id +""}
                    key={item.id}
                    //onClick = {()=> onBoxClicked(item.id)}
                    >
                    <h2 style={{ paddingRight:200}}>[{item.id}] 익명</h2>  <h2 style={{ paddingRight:200}} > {item.출발}~{item.도착}</h2> <h2>{item.작성일}</h2>     
                    </Box>
                    ))}</li>
                </ul>
            </Container>
        </>
        //style={{ paddingRight:50}}

    );

}
export default First;