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
import First from './First';
import Second from './Second';
import Third from './Third';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';

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
  max-width: 1000px; // 탭의 "최대 길이 " 정하기  - 탭의 너비 구하기 => 페이지 스타일링
  margin: 0 auto;
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
  grid-template-columns: repeat(3, 1fr);
  justify-content: flex-start;
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
  margin-left:50px;
  color:black;
  a {
    display: block;
  }
`;

const Menus = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: flex-start;
  background-color: #bbe1fad2;
  text-align: center;
  border-radius: 10px;
  margin: 1px;
`;

const Menu = styled.span`
  width: 300px;
  font-size: 20px;
  font-weight: 400;
  background-color: #bbe1fad2;
  color: black;
  a {
    display: block;
  }
  padding: 15px;
  border-radius: 10px;
`;

function Review (){
    const firstMatch = useRouteMatch('/First');
    const secondMatch = useRouteMatch('/Second');
    const thirdMatch = useRouteMatch('/Third');

    return (
    <>    
    <Wrapper>
        <Container >
          <Tabs>
            <Tab isActive={firstMatch !== null}>
              <Link to="/Review/First">#힐링 코스</Link>
            </Tab>

            <Tab isActive={secondMatch !== null}>
              <Link to="/Review/Second">#무난 코스</Link>
            </Tab>

            <Tab isActive={thirdMatch !== null}>
              <Link to="/Review/Third">#비추 코스</Link>
            </Tab>
          </Tabs>
          <Menus>
            <Menu>작성자</Menu>
            <Menu>코스</Menu>
            <Menu>작성일</Menu>
          </Menus>
          <br />


          <Switch>
            <Route path="/Review/First">
              <First />
            </Route>
            <Route path="/Review/Second">
              <Second />
            </Route>
            <Route path="/Review/Third">
              <Third />
            </Route>
          </Switch>
        </Container>
      </Wrapper>
    </>
    );
}
export default Review;