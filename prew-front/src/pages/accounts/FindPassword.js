import React, { useEffect, useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import styles from "../../style/pages/accounts/FindPassword.module.scss";

const FindPassword = () => {
    const [loading, setLoading] = useState(false);
    const [alertMsg, setMsg] = useState('');
    const [isVerified, setVerified] = useState('');
    
    useEffect(() => {
        if (alertMsg) {
            setTimeout(() => {
                setMsg('');
                setLoading(false);
            }, 1500)
        }
    }, [alertMsg, loading])

    const sendVerifyCode = () => {
        setVerified(true);
    }

    return (
        <div className={styles.div}>
            <h2 className={styles.logo}>
                <span className={styles.logoColor}>PREW</span>
            </h2>

            <div>
                <div className={styles.textDiv}>
                    <h3>비밀번호 찾기</h3>
                    <p className={styles.text}>PREW에 가입하신 이메일 번호를 입력해 주세요.</p>
                </div>
                <form className={styles.formDiv}>
                    <div className={`${styles.form}`}>
                        <InputText placeholder="이메일"id="email" />
                    </div>
                    {isVerified ? (
                        <div>
                            <div className={`${styles.form}`}>
                                <InputText placeholder="인증번호"id="verifyCode" />
                            </div>
                            <Button label="인증번호 확인" type="submit" className={`${styles.form} mt-0`} />
                        </div>
                    ) : (
                        <Button label="메일로 인증번호 발송" type="submit" disabled={loading} className={`${styles.form} mt-0`} onClick={sendVerifyCode}/>
                    )}
                </form>
                <div>
                    <Link to="/accounts/auth/login" className="text-sm font-semibold w-full py-2 px-3">로그인 하기</Link>
                    <Link to="/accounts/auth/sign-up" className="text-sm font-semibold w-full py-2 px-3">회원가입 하기</Link>
                </div>
            </div>
        </div>
    );
};

export default FindPassword;