import React, { useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    
    return (
        <div>
            Login
            <h2>
                <span>PREW</span>
            </h2>
            <form className='card justify-content-center'>
                {/* primereact 디자인 적용 input field */}
                <div className="p-float-label p-inputtext-lg">
                    <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email">PREW ID (아이디 또는 이메일)</label>
                </div>
                <div className="p-float-label p-inputtext-lg">
                    <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} />
                    <label htmlFor="password">비밀번호 (문자, 특수문자, 숫자를 포함해주세요)</label>
                </div>

                <label className="p-float-label p-inputtext-lg">
                    <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox> 로그인 상태 유지
                </label>
        
                <Button label="PREW 로그인" type="submit" />
            </form>
            <Button label="회원가입 하기" link />
            <Button label="비밀번호 찾기" link />
        </div>
    );
};

export default Login;