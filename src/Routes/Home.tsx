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
  height: 140vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image:
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;



function Home() {
    //사진 첨부 
    const imgurl = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F27319C385377168A02";
    return (
        <>
        <Wrapper>
            <Banner bgPhoto={imgurl} />
        </Wrapper>
        </>
    );
  }
  export default Home;