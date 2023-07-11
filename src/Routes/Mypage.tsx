import { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
} from 'react-router';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import Update from './Update';
import MyList from './MyList';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
const roadBg = require("../images/roadBg.png");


//마이 페이지 detail 화면 -> 이중 라우터를 사용하기 위해서 스타일 위치 맞춰야함
const Wrapper = styled(motion.div)`
  height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  background-color:white;
`;

const Container = styled.div`
  height: 80vh;
  padding: 0px 20px;
  max-width: 400px; // 탭의 "최대 길이 " 정하기  - 탭의 너비 구하기 => 페이지 스타일링
  //margin: 0 auto;
  background-color:white;  // 마이페이지 중앙 사각형
`;

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

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`//다른탭을 클릭하면 상대 편은 뜨지 않도록 작용
  text-align: center;
  text-transform: uppercase;
  width:210px;
  font-size: 25px;
  font-weight: 400;
  background-color: #ffff81;
  padding: 7px 0px;
  border-radius: 10px;
  color:black;
  a {
    display: block;
  }
`;

function Mypage (){
  const updateMatch = useRouteMatch('/Update');
  const myListMatch = useRouteMatch('/MyList');
  
  return (
    //홈 버튼 생성
<><Wrapper>
    <Container>
      <Header>
        <Title>
          마이페이지
        </Title>
      </Header>
          <Tabs>
            <Tab isActive={updateMatch !== null}>
              <Link to="/Mypage/Update">회원 정보 수정하기</Link>
            </Tab>

            <Tab isActive={myListMatch !== null}>
              <Link to="/Mypage/MyList">나의 경로 보기</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path="/Mypage/Update">
              <Update />
            </Route>
            <Route path="/Mypage/MyList">
              <MyList />
            </Route>
          </Switch>
      </Container>
      </Wrapper>
    </>
  );
}
export default Mypage;