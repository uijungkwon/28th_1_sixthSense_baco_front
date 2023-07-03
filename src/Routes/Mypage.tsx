import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //background: linear-gradient(155deg, rgb(172, 250, 151), rgb(133, 254, 246));
  background:whitesmoke;
  border-radius: 3px;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const InfoBox = styled.div`
  background: rgba(255, 255, 255, 0.5);
  width: 400px;
  height: 400px;
  margin-right:120px;
  margin-left:120px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: whitesmoke;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }

`;
const RoadBox = styled.div`
background: rgba(255, 255, 255, 0.5);
  width: 700px;
  height: 550px;
  margin-right:120px;
  margin-left:120px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: whitesmoke;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;

const CreateForm = styled.form`
  padding: 0px 20px;
	display: flex;
	position: relative;
	width: 100%;
	height: 1 px;
	margin: 0 auto;
	margin-bottom: 10px;
	background-color: ${(props) => props.theme.cardColor};
  flex-direction: column;//위아래로 input 창 뜨게 만들기
	input {
		width: 60%;
		border: 1;
		border-radius: 10px;
		background-color: white;
		padding: 8px 15px;
		font-size: 20px;
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    margin-left:90px;
    margin-bottom:40px;
	}

	button {
		right: 0;
		width: 40%;
		background-color: #c0ffa8;
		border: none;
		border-radius: 10px;
		font-size: 20px;
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.accentColor};
        margin-top: 130px;
        margin-left:110px;
	}
    p{  
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    margin-left: 15px;
        label{
            font-size:20px;
            color:black;

        }

    }
`;
const InfoButton = styled.button`
        background-color: #c0ffa8;
		border: none;
		border-radius: 10px;
		font-size: 18px;
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.accentColor};

`;

function Mypage (){
    return (
        <>
         <Wrapper>
            <InfoBox>
                <InfoButton>회원 정보 수정</InfoButton>
            </InfoBox>

            <RoadBox>
            </RoadBox>
         </Wrapper>
        </>
    );
}
export default Mypage;