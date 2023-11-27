/* 로그인 컴포넌트 정의 
: 로그인 폼 렌더링, 사용자가 입력한 정보 서버에 전송하는 로직 필요
*/
import React, { useEffect, useState, useContext } from 'react'
import aronlogo from '../image/aronlogo.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

// useState를 사용해 아이디(id), 비밀번호(pw), 
// 그리고 각 입력 값의 유효성(idValid, pwValid)을 관리하고 있습니다. 
// 또한 로그인 버튼의 활성화 상태(notAllow)도 관리하고 있습니다.
const Login = () => {

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const { setUser } = useContext(UserContext);

    // 유효여부 판단 state
    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);

    // 허용하지 않는 상태 (버튼 비활성화 상태)
    const [notAllow, setNotAllow] = useState(true);
    const navigate = useNavigate();

    // useEffect사용해서 조건에 따라 보여줄 컴포넌트를 설정해준다
    // usenavigate사용해서 버튼 클릭시 이동시켜주기

    // 'touched' state 추가
    const [idTouched, setIdTouched] = useState(false);
    const [pwTouched, setPwTouched] = useState(false);

    // handleId와 handlePw 함수에서는 
    // 입력된 아이디와 비밀번호의 유효성 검사를 수행하고 있습니다. 
    // 정규표현식을 이용해 아이디는 8자리 숫자, 
    // 비밀번호는 8자 이상의 영문, 숫자, 특수문자를 포함한 문자열인지 검사하고 있습니다.
    const handleId = (e) => {
        // onchange 인터페이스 호출시마다 handleId가 실행되는거니까 e.target.value 사용
        const newId = e.target.value;
        setId(newId);
        setIdTouched(true);  // 아이디 필드가 'touched'되었다고 표시
        // 숫자 8자리의 아이디만 유효한 값으로 설정 (정규표현식)
        const idRegex = /^\d{8}$/;
        // 입력된 아이디가 유효하면 true로 아니면 false로 변경
        if (idRegex.test(newId)) {
            setIdValid(true);
        } else {
            setIdValid(false);
        }
    }

    const handlePw = (e) => {
        const newPw = e.target.value;
        setPw(newPw);
        setPwTouched(true);  // 비밀번호 필드가 'touched'되었다고 표시
        //영어, 숫자, 특수문자 포함 8자 이상 입력해야 유효한 값으로 설정 (정규표현식)
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (pwRegex.test(newPw)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
    }

    // 임시로 설정한 User의 id, pw값이 id와 pw값과 같다면 
    // -> 로그인 성공/ 같지 않다면 -> 로그인 실패 
    // onClickconfirmButton에서는 유효한 아이디와 비밀번호가 입력되었을 때 
    // 서버에 로그인 요청을 보내는 기능을 수행하고 있습니다. 
    // 로그인에 성공하면 사용자 정보를 context와 localStorage에 저장하고, 
    // 메인 페이지로 이동합니다.
    const onClickconfirmButton = async () => {
        try {
            const response = await axios.post('http://localhost:3001/user/login', { id, pw });
            if (response.data.msg === 'success') {
                const user = {
                    job: response.data.user.class,
                    name: response.data.user.name
                };
                setUser(user); // 로그인 성공 후에 UserContext의 setUser를 호출하여 사용자 정보를 업데이트
                localStorage.setItem('user', JSON.stringify(user)); // 로컬 스토리지에도 사용자 정보 저장
                localStorage.setItem('loginTime', Math.floor(Date.now() / 1000)); // 현재 시간을 초 단위로 저장
                alert('로그인에 성공했습니다');
                if (user.job === 0 || user.job === 1) {
                    navigate('/');
                }else if (user.job === 9) {
                    navigate('/adminpage')
                }
                // navigate('/main1')
            } else {
                alert('사번과 비밀번호를 확인해주세요');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect를 이용해 아이디와 비밀번호의 유효성 상태가 변경될 때마다 
    // 로그인 버튼의 활성화 상태를 업데이트하고 있습니다.
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            // 로그인 상태 체크 API를 호출하여 로그인 상태인 경우에만 '/main1'로 이동
            axios.get('/check-login')
                .then(response => {
                    if (response.data.loggedIn) {
                        // navigate('/main1');
                    }
                })
                .catch(error => {
                    console.error('로그인 상태 확인 실패', error);
                });
        }
    }, []);


    // idValid와 pwValid가 유효하면 로그인 버튼 활성화 시킴
    // 그 전까지는 setNotAllow(true) 즉, 허락되지 않은 비활성화 상태로 둠
    useEffect(() => {
        if (idValid && pwValid) {
            setNotAllow(false);
            return;
        } setNotAllow(true);
    }, [idValid, pwValid]);

    // handleKeyPress 함수 추가
const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !notAllow) {
        onClickconfirmButton();
    }
};

    return (
        <div className='page'>
            <div className="logo-wrap">
                <img className="logo-img" src={aronlogo} alt="로고자리" />
            </div>
            <div className="content-wrap">
                <div className="input-wrap">
                    <input 
                    type="text" className='input' placeholder='사번' value={id} onChange={handleId} onKeyPress={handleKeyPress} 
                    />
                </div>
                <div className="error-message-wrap">
                    {!idValid && id.length > 0 && (
                        <div>사번을 확인해주세요</div>
                    )}
                </div>
                <div className="input-wrap">
                    <input type="password" className='input' placeholder='비밀번호' value={pw} onChange={handlePw} onKeyPress={handleKeyPress}  
                    />
                </div>
                <div className="error-message-wrap">
                    {!pwValid && pw.length > 0 && (
                        <div>영문,숫자,특수문자 포함 8자리 이상 입력해주세요</div>
                    )}
                </div>
                <div>
                    {/* disabled 속성 : 해당 요소가 비활성화 됨을 명시 */}
                    <button
    onClick={onClickconfirmButton}
    className='bottom-button'
    disabled={notAllow}
    onKeyPress={handleKeyPress}
    tabIndex="0" // tabIndex 추가
>
    LOGIN
</button>
                </div>
            </div>


        </div>
    )
}

export default Login