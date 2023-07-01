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
  
  interface IForm {
    keyword: string;
  }
  
  const Nav = styled.nav`
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #bbfaca69;
    position: fixed;
    width: 100%;
    top: 0;
    height: 80px;
    font-size: 15px;
    padding: 20px 40px;
  `;
  
  const Col = styled.div`
    display: flex;
    align-items: center;
  `;
  const Logo = styled.div`
    margin-right: 350px;
    width: 250px;
    height: 25px;
    font-size: 20px;
    color: black;
  `;

  const Items = styled.ul`
    display: flex;
    align-items: center;
  
    color: ${(props) => props.theme.white.darker};
    transition: color 0.3 ease-in-out;
    &:hover {
      color: ${(props) => props.theme.white.lighter};
    }
  `;
  const Item = styled.li`
    margin-right: 70px;
    display: flex;
    position: relative;
    justify-content: center;
    flex-direction: column;
    color:black;
  `;
  const LogItems = styled.ul`
  margin-left: 200px;
  display: flex;
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
  const Circle = styled(motion.span)`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    bottom: -10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: #1621f1;
  `;
 const Footer  = styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55px;
  background-color:#bbfaca69 ;
  padding: 20px 40px;
  font-size: 15px;
 `;
  function Header() {
    //2) 현재 어느 페이지에 있는지 확인
    const homeMatch = useRouteMatch("/");
    const myPageMatch = useRouteMatch("/Mypage");
    const roadMatch = useRouteMatch("/Road");
    const enrollMatch = useRouteMatch("/Enroll");
    const loginMatch = useRouteMatch("/Login");
    //3) 스크롤 내릴때 Nav바 색깔 변환
    const { scrollY } = useScroll();
    const navAnimation = useAnimation();

    return (
    <>
      <Nav
      >
        <Col>
          <Logo>
            따릉이 경로 추천 서비스
          </Logo>
          <Items>
            <Item>
              <Link to="/">
                홈 {homeMatch?.isExact ? <Circle layoutId="circle" /> : null}
              </Link>
            </Item>
            <Item>
              <Link to="/Mypage">
                마이 페이지 {myPageMatch ? <Circle layoutId="circle" /> : null}
              </Link>
            </Item>
            <Item>
              <Link to="/Road">
                경로 추천 {roadMatch ? <Circle layoutId="circle" /> : null}
              </Link>
            </Item>
            </Items>
            <LogItems>
            <LogItem>
              <Link to="/Enroll">
                회원 가입 {enrollMatch ? <Circle layoutId="circle" /> : null}
              </Link>
            </LogItem>
            <LogItem>
              <Link to="/Login">
                로그인 {loginMatch ? <Circle layoutId="circle" /> : null}
              </Link>
             </LogItem>
            </LogItems>
        </Col>
      </Nav>
    
      <Footer>
        <Items>
        <Item>
            사업자 정보 , 메일 주소 등... 
        </Item>
        </Items>
      </Footer>
     </>
    );
  }
  
  export default Header;