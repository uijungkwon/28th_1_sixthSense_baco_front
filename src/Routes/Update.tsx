import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isLoginAtom,  isNickNameAtom } from "../atoms";
import axios from 'axios';

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
    margin-top: 60px;
    margin-left:110px;      

`;
const P = styled.p`
    align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    flex-direction: column;
    margin-bottom:10px;
`;  

const Label = styled.label`
  font-size:20px;
  color:black;
  margin-right:30px;
`;
const Span = styled.span`
  margin-top:-20px;
  color:red;
`;
interface IForm { //start 값의 타입
  name:string;
  password: string;
  passwordConfirm: string;
}

function Update() {
  const [nickname,setnickname] = useRecoilState(isNickNameAtom);
  const { register, handleSubmit, setValue,getValues, formState: { errors,isDirty }, watch} =useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {
      name:"",
      password:"",
      passwordConfirm:""
    },
  });

  const userID = useRecoilValue(isLoginAtom);

  const onValid = ({name, password,passwordConfirm}: IForm) => {
    axios.post(`https://port-0-baco-server-eg4e2alkhufq9d.sel4.cloudtype.app/Mypage/MemberInfo-change/${userID}`,
    {
      newPassword:password,
      newPasswordConfirm:passwordConfirm,
      newNickname:name,
    },
    {
      headers: {
        //'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*",
      }
    })
    .then((response) => {
      window.alert('회원 정보 수정이 완료되었습니다.')
      console.log(response);//수정된 회원정보 받아오기! => 정보는 알아서 백엔드 처리
      setnickname((nickname) => response?.data?.nickname);//반환된 새 닉네임 가져옴
      history.push('/');
    })
    .catch((error) => {
      console.log(error.response);
      window.alert(error);
    })
    
  };
  const history = useHistory();

  return (
    <>
    <Wrapper>
      <Box >
        <CreateForm onSubmit={handleSubmit(onValid)} >
        <P>
                <Label style={{ paddingRight:50}}>닉네임 </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="변경할 닉네임을 입력하세요"
                  {...register("name", {
                    required: "변경할 닉네임을 입력하세요",
              })}
            />
            </P>
              <P>
                <Label style={{ paddingRight:35}}>비밀번호 </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="변경할 비밀번호를 입력하세요"
                  aria-invalid={
                  !isDirty ? undefined : errors.password ? "true" : "false"
                  }
                  {...register("password", {
                    required: "비밀번호를 입력하세요 .",
                    minLength: {
                    value: 8,
                    message: "8자리 이상 입력하세요.",
                  },
                  validate: {
                    check: (val) => {
                    if (getValues("password") !== val) {
                      return "비밀번호가 일치하지 않습니다.";
                  }
                  },
              },
              })}
            />
            </P>
            {errors.password && (
              <Span>{errors.password?.message}</Span>
            )}
                
              <P>
                <Label>비밀번호 확인 </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 한번 더 입력하세요"
                  {...register("passwordConfirm", {
                    required: "비밀번호 확인은 필수입니다.",
                    minLength: {
                      value: 7,
                      message: "8자 이상의 비밀번호를 사용하세요."
                    } ,
                    validate: {
                      check: (val) => {
                        if (getValues("password") !== val) {
                         return "비밀번호가 같지 않습니다.";
                        }
                      }
                    }
                  })}
                />
              </P>
              {errors?.passwordConfirm && (
              <Span>{errors.passwordConfirm.message}</Span>
            )}
            
              <Button >수정 완료</Button>
            </CreateForm>
          </Box>
      </Wrapper>
    </>
  );
}

export default Update;