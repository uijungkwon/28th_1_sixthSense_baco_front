import { motion } from "framer-motion";
import { url } from "inspector";
import { styled } from "styled-components";
const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;
const homeBg = require("../images/homeBgPhoto.png");
//로딩중인지 알려주는 컴포넌트
const Loader = styled.div`
  font-size: 30px;
  margin-top: 100px;
  text-align: center;
`;


const Banner = styled.div ` 
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-image:url(${homeBg});
  background-repeat: no-repeat;
`;
/*
const Info = styled.div`
  background-color: whitesmoke;
  height: 35vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: grid;
  grid-template-columns: 1fr 1fr;
  //background-color: whitesmoke;
`;
*/
const Box = styled.div` //서비스 소개 적을 박스 
  width: 500px;
  height: 200px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  //display: flex;
  //align-items: center;
  //justify-content: center;

  //position: absolute; /* 핵심코드 */
  top: 50%; /* 핵심코드 */
  left: 50%; /* 핵심코드 */
  transform: translate( -50%, -50%); /* 핵심코드 */
  font-size: x-large;
  margin-left: 200px;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;
const Title = styled.h2`
  font-size:25px;
  font-weight:bold;
  color: black;
`;
const Overview = styled.p`
  font-size: 25px;
  color: black;

`;
const FootTxt = styled.p`
  font-size: 16px;
  color: black;
`;
const Footer  = styled.div`

  display: flex;
  //justify-content: /*space-between*/;
  align-items: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color:whitesmoke ;
  padding: 20px 40px;
  font-size: 15px;
 `;
function Home() {
    //사진 첨부 
    

    const imgurl ="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F27319C385377168A02";
    return (
        <>
        <Wrapper>
            <Banner >
              <Box>
                <Overview>
                  안녕하십니까
                </Overview>
              </Box>
              </Banner>
        </Wrapper>
        <Footer >
          <Title>바코 (아이콘) </Title>
          <FootTxt>대표: 식스센스 사업자 번호: 8282   주소: 서울특별시 용산구 청파로 47길   이메일: sixsense@sookmyung.ac.kr     전화번호:  1234-5678 </FootTxt>
        </Footer>
        </>
    );
  }
  export default Home;