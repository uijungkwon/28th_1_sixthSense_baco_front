import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface FormValue {
  email: string;
  password: string;
  passwordConfirm: string;
}
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 40px;
  font-weight:bold;
  color: black;
`;
const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;

const Box = styled.div`
  background: rgba(255, 255, 255, 0.5);
  width: 700px;
  height: 400px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: black;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;

const Container = styled.form`
  padding: 0px 20px;
	display: flex;
	position: relative;
  left: 50px;
	width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left:-100px;
	background-color: ${(props) => props.theme.cardColor};
  flex-direction: column;
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
    margin-bottom: 20px;
`;

const Button = styled.button`
    //right: 0;
		width: 20%;
		background-color: #ffff81;
		border: none;
		border-radius: 10px;
		font-size: 25px;
		color: ${(props) => props.theme.accentColor};
    margin-top: 70px;
    //margin-left: 100px;    
    margin-bottom: 30px;  

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
const Span = styled.span`
  margin-top:-10px;
  color:red;
`;
function Enroll() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    getValues
  } = useForm<FormValue>();

  const onSubmit = (data: FormValue) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <Header>
        <Title> 회원 가입</Title>
      </Header>
      <Box>
        <Container>
          <P>
            <Label htmlFor="email" style={{ paddingRight:50}}>이메일</Label>
            <Input
              id="email"
              type="text"
              placeholder="test@email.com"
              aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
              {...register("email", {
                required: "        이메일은 필수 입력입니다.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "        이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            
          </P>
          {errors.email && <Span>{errors.email?.message}</Span>}
          <P>
            <Label htmlFor="password" style={{ paddingRight:35}}>비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              aria-invalid={
                !isDirty ? undefined : errors.password ? "true" : "false"
              }
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 비밀번호를 사용하세요.",
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
            <Label htmlFor="password">비밀번호 확인</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...register("passwordConfirm", {
                required: "        비밀번호 확인은 필수입니다.",
                minLength: {
                  value: 7,
                  message: "        최소 8자 이상의 비밀번호를 사용하세요."
                },
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
          <Button onClick={handleSubmit(onSubmit)}>회원가입 </Button>
        </Container>
      </Box>
    </Wrapper>
  );
}

export default Enroll;