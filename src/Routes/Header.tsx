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
    background-color: #bbfaca95;
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
    background-color: green;
  `;
 
  function Header() {
    //2) 현재 어느 페이지에 있는지 확인
    const homeMatch = useRouteMatch("/");
    const myPageMatch = useRouteMatch("/Mypage");
    const roadMatch = useRouteMatch("/Road");
    const enrollMatch = useRouteMatch("/Enroll");
    const loginMatch = useRouteMatch("/Login");
    
    //3) 로고 클릭시 홈으로 이동
    const history = useHistory();
    const gohome = () => {
        history.push(`/`);
      };
    
    return (
    <>
      <Nav
      >
        <Col>
          <Logo onClick={gohome}>
            따릉이 경로 추천 서비스
          </Logo>
          <Items>
            <Item>
              <Link to="/">
                홈 {homeMatch?.isExact ? <Circle layoutId="circle" /> : null}
              </Link>
            </Item>
            <Item>
              <Link to="/Road">
                경로 추천 {roadMatch ? <Circle layoutId="circle" /> : null}
              </Link>
            </Item>
            <Item>
              <Link to="/Mypage">
                마이 페이지 {myPageMatch ? <Circle layoutId="circle" /> : null}
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
     </>
    );
  }
  
  export default Header;