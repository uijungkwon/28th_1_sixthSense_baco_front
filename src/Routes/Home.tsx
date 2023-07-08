import { motion } from "framer-motion";
import { url } from "inspector";
import { styled } from "styled-components";

const bike = require("../images/bike.png");
const homeBg = require("../images/homeBgPhoto.png");

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;


const Loader = styled.div`
  font-size: 30px;
  margin-top: 100px;
  text-align: center;
`;


const Banner = styled.div ` 
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-image:url(${homeBg});
  background-repeat: no-repeat;
`;

//서비스 소개 적을 박스 
const Box = styled.div` 
  width: 800px;
  height: 200px;
  border-radius: 30px;
  //box-shadow: 0px 2px 4px black;
  top: 50%; /* 핵심코드 */
  left: 50%; /* 핵심코드 */
  transform: translate( -50%, -50%); /* 핵심코드 */
  font-size: x-large;
  margin-left: 400px;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;
const Title = styled.h2`
  font-size:60px;
  font-weight:bold;
  color: black;
  margin-bottom: 15px;
`;
const Overview = styled.p`
  font-size: 25px;
  color: black;

`;
// Footer 설정
const FootItems = styled.ul`
  display: flex;
  align-items: center;
  //width: 630px;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color:whitesmoke ;
  padding: 20px 40px;
`;
const FootItem = styled.li<{font : string}>`
    display: flex;
    position: relative;
    justify-content: center;
    flex-direction: column;
    height: 25px;
    font-size: 20px;
    font-family: ${(props) => props.font};
    color: black;
  `;
const FootTxt = styled.p`
  font-size: 16px;
  color: black;
`;

const FootIcon = styled.img`
  width: 40px;
  height: 54px;
  margin-right: 150px;
  margin-left: 15px;
`;

function Home() {
    //사진 첨부 
    

    const imgurl ="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F27319C385377168A02";
    return (
        <>
        <Wrapper>
            <Banner >
              <Box>
                <Title>
                  나만의 <br></br>
                  환상적인 바이크 코스
                  <br></br>
                </Title>
                <Overview>
                  출발지와 도착지를 입력하면 당신만의 바이크 코스를 추천해드립니다. 
                </Overview>
              </Box>
              </Banner>
        </Wrapper>
          <FootItems>
            <FootItem font = {"Jua"}>
              바코
            </FootItem>
            <FootItem font = {"Jua"}>
              <FootIcon src = {bike} />
            </FootItem>
            <FootItem font = {"Hanna"}>
            <FootTxt>대표: 식스센스 사업자 번호: 8282   주소: 서울특별시 용산구 청파로 47길   이메일: sixsense@sookmyung.ac.kr     전화번호:  1234-5678 </FootTxt>
            </FootItem>
          </FootItems>
        </>

    );
  }
  export default Home;
// <FootTxt>대표: 식스센스 사업자 번호: 8282   주소: 서울특별시 용산구 청파로 47길   이메일: sixsense@sookmyung.ac.kr     전화번호:  1234-5678 </FootTxt>
  /*const LogoItems = styled.ul`
  display: flex;
  align-items: center;
  width: 630px;
`;
  const LogoItem = styled.li`
    display: flex;
    position: relative;
    justify-content: center;
    flex-direction: column;
    height: 25px;
    font-size: 30px;
    font-family: "Jua";
    color: black;
  `;
  const LogoIcon = styled.img`
    width: 60px;
    height: 54px;
    margin: 10px;
  `; */