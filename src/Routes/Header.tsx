import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { isEmailAtom, isLoginAtom, isNickNameAtom } from "../atoms";

const bike = require("../images/bike.png");
interface IForm {
  keyword: string;
}
const Nav = styled.nav`
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #bbe1fad2;
  position: fixed;
  width: 100%;
  top: 0;
  height: 46px;
  font-size: 10px;
  padding: 20px 40px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;
// 1) 로고 화면 
const LogoItems = styled.ul`
display: flex;
align-items: center;
width: 500px;
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
`;

//2) 메뉴바 화면 
const Items = styled.ul`
  display: flex;
  align-items: center;
  margin-left:20px;
  font-family: "Hanna"; 
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3 ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;
const Item = styled.li`
  margin-right: 120px;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  color:black;
`;



// 3) 회원가입/로그인 화면
const LogItems = styled.ul`
margin-left: 1150px;
display: flex;
position:fixed;
align-items: center;
font-size:12px;

`;
const LogItem = styled.li`
  margin-right: 30px;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  color:black;
`;
//4) 페이지 이동 동그라미
const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #0044ff;
`;
const Strong = styled.strong`
font-weight:bold;
`
function Header() {
  //2) 현재 어느 페이지에 있는지 확인
  const homeMatch = useRouteMatch("/");
  const myPageMatch = useRouteMatch("/Mypage");
  const roadMatch = useRouteMatch("/Road");
  const enrollMatch = useRouteMatch("/Enroll");
  const loginMatch = useRouteMatch("/Login");
  const reviewMatch = useRouteMatch("/Review");
  
  //3) 로고 클릭시 홈으로 이동
  const history = useHistory();
  const gohome = () => {
      history.push(`/`);
    };
  //4) 스크롤 내리면 헤더 투명하게 변경
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  useMotionValueEvent(scrollY, "change", () => {
    if (scrollY.get() > 100) {
      navAnimation.start({
        backgroundColor: "#0000000",
      });
    } else {
      navAnimation.start({
        backgroundColor: "#bbe1fad2",
      });
    }
  });

  const member = useRecoilValue(isLoginAtom);
  const email = useRecoilValue(isEmailAtom);
  const nickname = useRecoilValue(isNickNameAtom);
  return (
  <>
    <Nav
    >
      <Col>
      <LogoItems>
        <LogoItem>
          바코 
        </LogoItem>
        <LogoItem>
          <LogoIcon src = {bike} />
        </LogoItem>
      </LogoItems>
        <Items>
          <Item>
            <Link to="/">
              홈 {homeMatch?.isExact ? <Circle layoutId="circle" /> : null}
            </Link>
          </Item>
          <Item>
            <Link to="/Road">
              후기 작성  {roadMatch ? <Circle layoutId="circle" /> : null}
            </Link>
          </Item>
          
          <Item>
            <Link to="/Review">
              후기 공유 게시판 {reviewMatch ? <Circle layoutId="circle" /> : null}
            </Link>
          </Item>
          { nickname !=="0" ?(
            <Item>
              <Link to="/Mypage">
                마이 페이지 {myPageMatch ? <Circle layoutId="circle" /> : null}
              </Link>
            </Item>
          ) : null}

          </Items>
          <LogItems>
          { nickname !=="0" ?(
            <LogItem style = {{marginLeft:"100px"}}>
             <h1><Strong>{nickname} 님</Strong> </h1>
           </LogItem>
          ) :(
            <>
            <LogItem>
             <Link to="/Join_2">
               회원 가입 {enrollMatch ? <Circle layoutId="circle" /> : null}
             </Link>
           </LogItem>
           <LogItem>
             <Link to="/Login">
               로그인 {loginMatch ? <Circle layoutId="circle" /> : null}
             </Link>
            </LogItem>
           </>
          )
          
          }
          
          </LogItems>
      </Col>
    </Nav>
   </>
  );
}
//로그인 완성하면 로그인 items 에 "아이디"가 뜨도록 생성함 
export default Header;