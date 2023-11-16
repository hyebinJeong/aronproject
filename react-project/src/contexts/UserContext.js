/* 사용자 정보를 전역적으로 관리하기 위한 Context를 생성하는 부분 */
import React from 'react';

// 사용자 정보를 저장할 Context를 생성합니다.
const UserContext = React.createContext(null);

export default UserContext;