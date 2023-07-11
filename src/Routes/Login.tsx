import { useForm } from "react-hook-form";
import styled from "styled-components";

type FormData = {
  email: string;
  password: string;
};

const Container = styled.form`
  background-color: whitesmoke;
  height: 200vh;
  position: relative;
  left: 50px;
  top: 100px;
`;
//스타일 설정 필요 ** 

function Login({
  onSubmit = (data: FormData) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(data));
        resolve();
      }, 1000);
    });
  },
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<FormData>(); // Specify the generic type here

  return (
    <div style={{ backgroundColor: "whitesmoke", height: "200vh" }}>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="text"
          placeholder="test@email.com"
          aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && <small role="alert">{errors.email?.message}</small>}
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="****************"
          aria-invalid={
            !isDirty ? undefined : errors.password ? "true" : "false"
          }
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            minLength: {
              value: 8,
              message: "8자리 이상 비밀번호를 사용하세요.",
            },
          })}
        />
        {errors.password && (
          <small role="alert">{errors.password?.message}</small>
        )}
        <button type="submit" disabled={isSubmitting}>
          로그인
        </button>
      </Container>
    </div>
  );
}

export default Login;