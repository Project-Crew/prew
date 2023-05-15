import React, { useEffect, useState } from 'react';
// import { useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import styles from "../../style/pages/accounts/Login.module.scss";
// import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [alertMsg, setMsg] = useState('');
    
    // const dispatch = useDispatch();
    // let user = userSelector((state) => {return state.user});
    
    useEffect(() => {
        if (alertMsg) {
            setTimeout(() => {
                setMsg('');
                setLoading(false);
            }, 1500)
        }
    }, [alertMsg, loading])
    /*
    // id 와 pw 입력되었는지 확인
    const LoginFunc = (e) => {
        e.preventDefault();
        if (!email) {
            return alert("ID를 입력하세요");
        }
        else if (!password) {
            return alert("Password를 입력하세요");
        }
        else {
            let body = {
                email,
                password
            };

            axios.post("Endpoint", body)
            .then((res) => {
                switch (res.data.code) {
                    case 200:
                        dispatch(loginUser(res.data.userInfo));
                        break;
                    case 400:
                        setMsg("ID, Password가 비어있습니다");
                        break;
                    case 401:
                        setMsg("존재하지 않는 ID 입니다");
                        break;
                    case 402:
                        setMsg("Password가 틀립니다");
                        break;
                    default:
                        break;
                }
            })
        }
    }
    */

    return (
        <div className={styles.div}>
            <h2 className={styles.logo}>
                <span className={styles.logoColor}>PREW</span>
            </h2>
            {/* onSubmit={LoginFunc} */}
            <form className='card'>
                <p>{alertMsg}</p>
                {/* primereact 디자인 적용 input field */}
                <div className={`p-float-label ${styles.form}`}>
                    <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="email">PREW ID (아이디 또는 이메일)</label>
                </div>
                <div className={`p-float-label ${styles.form}`}>
                    <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false}/>
                    <label htmlFor="password">비밀번호 (문자, 특수문자, 숫자를 포함해주세요)</label>
                </div>

                <label className={`p-float-label ${styles.form}`}>
                    <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox> 로그인 상태 유지
                </label>
        
                <Button label="PREW 로그인" type="submit" disabled={loading} className={`${styles.form} mt-0`}/>
            </form>

            <div>
                <Button label="회원가입 하기" link />
                <Button label="비밀번호 찾기" link />
            </div>

            <p>SNS로 로그인 하기</p>
        </div>
    );
};

export default Login;