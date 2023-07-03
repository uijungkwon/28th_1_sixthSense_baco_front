import { motion } from "framer-motion";
import { url } from "inspector";
import { styled } from "styled-components";

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

//로딩중인지 알려주는 컴포넌트
const Loader = styled.div`
  font-size: 30px;
  margin-top: 100px;
  text-align: center;
`;


const Banner = styled.div<{bgPhoto: string}>`
  height: 110vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: 
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Info = styled.div`
  background-color: #15b13465;
  height: 35vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: grid;
  grid-template-columns: 1fr 1fr;
  //background-color: whitesmoke;
`;
const Box = styled.div`
  width: 500px;
  height: 170px;
  margin-right:120px;
  margin-left:120px;
  margin-top:30px;
  border-radius: 30px;

  display: flex;
  align-items: center;
  //justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;
const Title = styled.h2`
  position: relative;
  //top: -80px;
  font-size:25px;
  font-weight:bold;
  margin-bottom: 15px;
  color: white;
`;
const Overview = styled.p`
  position: relative;
  //top: -30px;
  font-size: 16px;
  width: 50%;
  color: white;

`;
const Footer  = styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color:#15b13465 ;
  padding: 20px 40px;
  font-size: 15px;
 `;
function Home() {
    //사진 첨부 
    const imgurl = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F27319C385377168A02";
    return (
        <>
        <Wrapper>
            <Banner bgPhoto={imgurl} />
            <Info >
              <Box >
                <Title >서비스 소개</Title>
              <Overview>서비스 소개 내용,....
                ..................
                .................
                ...........................................................
              </Overview>
              
              
              </Box>
              <Box >
                <Title>사용 안내</Title>
                <Overview>사용 안내 내용...,...
                  ....................................................
                  ........................
                  .................................
                </Overview>
              </Box>
            </ Info>
        </Wrapper>
        <Footer >
          <Overview>사업자 정보... 주소... 이메일.. 웹 하단 정보</Overview>
        </Footer>
        </>
    );
  }
  export default Home;