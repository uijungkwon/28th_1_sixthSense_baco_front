import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled(motion.div)`
  //height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color:white;
`;
const Box = styled(motion.div)`
  background: rgba(255, 255, 255, 0.5);
  width: 400px;
  height: 400px;
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
`;

const Input = styled.input`
    width: 200px;
		border: 1;
		border-radius: 10px;
		background-color: white;
		padding: 8px 15px;
		font-size: 20px;
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    margin-bottom:40px;
`;
const Button = styled.button`
    //right: 0;
		width: 40%;
		background-color: #ffff81;
		border: none;
		border-radius: 10px;
		font-size: 20px;
		color: ${(props) => props.theme.accentColor};
    margin-top: 130px;
    margin-left:110px;      

`;
const P = styled.p`
    align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    flex-direction: column;
`;

const Label = styled.label`
  font-size:20px;
  color:black;
  margin-right:30px;
`;
interface IForm { //start 값의 타입
  id: string;
  pw: string;
}

function Update() {
  const { register, handleSubmit, setValue } =useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {
      id:"",
      pw:""
    },
  });
  const onValid = ({id,pw}: IForm) => {
    console.log(id,"and", pw);
  };

  return (
    <>
    <Wrapper>
      <Box>
        <CreateForm onSubmit={handleSubmit(onValid)} >
              <P>
                <Label style={{ paddingRight:6}}>아이디 </Label>
                <Input {...register("id", {
                  required: "id를 입력하세요",
                })}
                  placeholder="id를 입력하세요"
                />
                </P>
              <P>
                <Label>비밀번호</Label>
                <Input {...register("pw", {
                  required: "pw를 입력하세요",
                })}
                  placeholder= "pw를 입력하세요"
                />
              </P>
              <Button >수정 완료</Button>
            </CreateForm>
          </Box>
      </Wrapper>
    </>
  );
}

export default Update;
