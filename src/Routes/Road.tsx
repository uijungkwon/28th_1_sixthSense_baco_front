import { styled } from "styled-components";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
    motion,
    useAnimation,
    useMotionValueEvent,
    useScroll,
  } from "framer-motion";
import { useForm } from "react-hook-form";
//배경색 배경 길이 정하기
const Wrapper = styled(motion.div)`
  height: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //background: linear-gradient(155deg, rgb(172, 250, 151), rgb(133, 254, 246));
  background:whitesmoke;
  border-radius: 3px;
`;
const Board = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Title = styled.h1`
  margin-top: -250px;
  font-size:30px;
  color:black;
`;
const Box = styled(motion.div)`
  background: rgba(255, 255, 255, 0.5);
  width: 400px;
  height: 400px;
  margin-right:120px;
  margin-left:120px;
  margin-top:40px;
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
const map = styled.div`

`;
//출발, 도착지 입력 폼
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
`;

const Input = styled.input`
    width: 60%;
		border: 1;
		border-radius: 10px;
		background-color: white;
		padding: 8px 15px;
		font-size: 20px;
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    //margin-left:90px;
    margin-bottom:40px;


`;
const Button = styled.button`
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

`;
const P = styled.p`
    align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    margin-left: 15px;
    
`;
const Label =styled.label`
  font-size:20px;
  color:black;
  margin-right:30px;
`;

const startState = atom({
  key:"start",
  default:" ",
});
const endState = atom({
  key:"end",
  default:" ",
});
interface IForm {
  start: string;
  end: string;
}

const LevelButton = styled.button`
    //right: 0;
		//width: 40%;
		background-color: #c0ffa8;
		border: none;
		border-radius: 10px;
		font-size: 18px;
		///align-items: center;
		//justify-content: center;
		color: ${(props) => props.theme.accentColor};
    //margin-top: 130px;
    //margin-left:110px;    
`;

function Road() {
    //1) 출발지, 도착지 장소 입력하기
    const [startValue, SetStart] = useRecoilState(startState); //atom 가져오고, 수정하기
    const [endValue, SetEnd] = useRecoilState(endState);

    const {register, handleSubmit,setValue} = useForm<IForm>();
    const onValid = (data:IForm)=>{
      setValue("start", " ");
      setValue("end", " ");
    }

    //2) 난이도 선택하기 (버튼)
    const onclick = (event:React.MouseEvent<HTMLButtonElement>)=>{
      const {currentTarget: {name}, //category name
            } = event;
      const target = {name}; //recoil로 만들기 
      console.log(target);
    }

    return (
        <>
        <Wrapper>
          <Title>따릉이 경로 추천</Title>
         <Board>
            <Box >
              <map />
              <Button>경로 저장</Button>
            </Box>
            <Box >
                <CreateForm onSubmit = {handleSubmit(onValid)}>
                    <P>
                        <Label>출발</Label>
                        <Input {...register("start",{
                                required:"출발지를 입력하세요",
                                  })} 
                                placeholder="출발지를 입력하세요" 
                        />
                    </P>
                    <P>
                        <Label>도착</Label>
                        <Input {...register("end",{
                                required:"도착지를 입력하세요",
                                })} 
                                placeholder="도착지를 입력하세요" 
                         />
                    </P>
                    <P>
                      <Label>난이도</Label>
                      <LevelButton name="상" onClick = {onclick}>상</LevelButton>
                      <LevelButton name="중" onClick = {onclick} >중</LevelButton>
                      <LevelButton name="하" onClick = {onclick}>하</LevelButton>
                    </P>
                    <Button>경로 찾기</Button>
                </CreateForm>
            </Box>
         </Board>
        </Wrapper>
        </>
    );
  }
  export default Road;
