import React, { useEffect, useState } from 'react'
import aronlogo from '../image/aronlogo.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 아이디 비밀번호 입력에 따른 경고창을 위한 테스트 데이터 (추후 삭제 예정)
// const User = {
//     id: '20231031',
//     pw: 'test1031!'
// }

const Login = () => {

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    
    // 유효여부 판단 state
    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);

    // 허용하지 않는 상태 (버튼 비활성화 상태)
    const [notAllow, setNotAllow] = useState(true);
    const navigate = useNavigate();

    const handleId = (e) => {
        // onchange 인터페이스 호출시마다 handleId가 실행되는거니까 e.target.value 사용
        const newId = e.target.value;
        setId(newId);
        // 숫자 8자리의 아이디만 유효한 값으로 설정 (정규표현식)
        const idRegex = /^\d{8}$/;
        // 입력된 아이디가 유효하면 true로 아니면 false로 변경
        if(idRegex.test(newId)){
            setIdValid(true);
        }else{
            setIdValid(false);
        }
    }

    const handlePw = (e) => {
        const newPw = e.target.value;
        setPw(newPw);

        //영어, 숫자, 특수문자 포함 8자 이상 입력해야 유효한 값으로 설정 (정규표현식)
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if(pwRegex.test(newPw)){
            setPwValid(true);
        }else{
            setPwValid(false);
        }
    }

    // 임시로 설정한 User의 id, pw값이 id와 pw값과 같다면 -> 로그인 성공/ 같지 않다면 -> 로그인 실패 
    const onClickconfirmButton = async () => {
        try {
          const response = await axios.post('http://localhost:3001/user/login', {
            id: id,
            pw: pw
          });
          if (response.data.msg === 'success') {
            alert('로그인에 성공했습니다');
              navigate('/main1')
        } else {
            alert('사번과 비밀번호를 확인해주세요');
          }
        } catch (error) {
          console.error(error);
        }
      };

    // idValid와 pwValid가 유효하면 로그인 버튼 활성화 시킴
    // 그 전까지는 setNotAllow(true) 즉, 허락되지 않은 비활성화 상태로 둠
    useEffect(() => {
        if(idValid && pwValid) {
            setNotAllow(false);
            return;
        } setNotAllow(true);
    }, [idValid, pwValid]);

    return (
    <div className='page'>

        <div className="logo-wrap">
            <img className="logo-img" src={aronlogo} alt="로고자리" />
        </div>

        <div className="content-wrap">
            <div className="input-wrap">
                <input type="text" className='input' placeholder='사번' value={id} onChange={handleId}/>
            </div>
            <div className="error-message-wrap">
                {!idValid && id.length > 0 && (
                    <div>사번을 확인해주세요</div>
                )}
            </div>
            <div className="input-wrap">
                <input type="password" className='input' placeholder='비밀번호' value={pw} onChange={handlePw}/>
            </div>
            <div className="error-message-wrap">
                {!pwValid && pw.length > 0 && (
                    <div>영문,숫자,특수문자 포함 8자리 이상 입력해주세요</div>
                )}
            </div>
            <div>
                {/* disabled 속성 : 해당 요소가 비활성화 됨을 명시 */}
                <button onClick={onClickconfirmButton} className='bottom-button' disabled={notAllow}>LOGIN</button> 
            </div>
        </div>


    </div>
    )
}

export default Login