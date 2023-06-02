import React, { useEffect, useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import styles from "../../style/pages/accounts/Login.module.scss";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [alertMsg, setMsg] = useState('');
    

    useEffect(() => {
        if (alertMsg) {
            setTimeout(() => {
                setMsg('');
                setLoading(false);
            }, 1500)
        }
    }, [alertMsg, loading])
    
    return (
        <div className={styles.div}>
            <h2 className={styles.logo}>
                <span className={styles.logoColor}>PREW</span>
            </h2>

            <div>
                <form className={`card ${styles.formDiv}`}>
                    <p>{alertMsg}</p>
                    {/* primereact 디자인 적용 input field */}
                    <div className={`${styles.form}`}>
                        <InputText placeholder="이메일"id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className={`${styles.form}`}>
                        <Password placeholder="비밀번호 (문자, 특수문자, 숫자를 포함해주세요)"id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask/>
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
        </div>
    );
};

export default Login;