import React, { useCallback, useEffect, useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import { ScrollPanel } from 'primereact/scrollpanel';
import styles from "../../style/pages/accounts/SignUp.module.scss";

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [result, setResult] = useState('');

    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [alertMsg, setMsg] = useState('');

    const [checkedInputs, setCheckedInputs] = useState([]);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        if (alertMsg) {
            setTimeout(() => {
                setMsg('');
                setLoading(false);
            }, 1500)
        }
    }, [alertMsg, loading])

    const onClick = () => {
        setStep((prev) => prev + 1);
      };

    const allCheckClick = useCallback((checked) => {
      if (checked) {
        setCheckedInputs(['ageCheck', 'firstCheck', 'secondCheck']);
      } else {
        setCheckedInputs([]);
      }
    }, []);

    const onCheckHandler = useCallback((e, id) => {
        if (e.checked) {
          setCheckedInputs([...checkedInputs, id]);
          console.log('체크 반영 완료');
        } else {
          setCheckedInputs(checkedInputs.filter((el) => el !== id));
          console.log('체크 해제 반영 완료');
        }
    }, [checkedInputs]);
    
    const onClickAgree = () => {
      if (
        checkedInputs.includes('firstCheck') &&
        checkedInputs.includes('secondCheck')
      ) {
        onClick();
      } else {
        alert('[필수] 약관에 모두 동의해야 가입이 진행됩니다.');
      }
    };

    const onSubmit = useCallback(
        (e) => {
          e.preventDefault();
          console.log(password, password2);
          if (password !== password2) {
            return setPasswordError(true);
          }
        },
        []
      );

    let stepSignUp;

    if (step === 1) {
        stepSignUp = (
            <div className={`${styles.labelDiv}`}>
                <label className={`${styles.label}`}>
                    <Checkbox
                    id="allCheck"
                    onChange={(e) => allCheckClick(e.target.checked)}
                    checked={checkedInputs.length >= 2 ? true : false}
                    style={{ marginRight: '10px' }}
                    />Prew 이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
                </label>
        
                <div className={`${styles.label}`}>
                    <label>
                        <Checkbox
                        id="firsttCheck"
                        onChange={(e) => onCheckHandler(e, 'firstCheck')}
                        checked={checkedInputs.includes('firstCheck') ? true : false}
                        style={{ marginRight: '10px' }}
                        />[필수] Prew 이용약관 동의
                        <ScrollPanel style={{ width: '100%', height: '200px' }} className="custombar1">
                            <p>
                            공정거래위원회 표준약관 제10023호

                            (2014. 9. 19. 개정)

                            **제1조(목적)**
                            이 약관은 (주)프류가 운영하는 개발자 커뮤니티(이하 “PREW”라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 PREW 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

                            ※ 「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」

                            **제2조(정의)**
                            ① “PREW”란 (주)프류가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 PREW를 운영하는 사업자의 의미로도 사용합니다.

                            ② “이용자”란 “PREW”에 접속하여 이 약관에 따라 “PREW”가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.

                            ③ ‘회원’이라 함은 “PREW”에 회원등록을 한 자로서, 계속적으로 “PREW”가 제공하는 서비스를 이용할 수 있는 자를 말합니다.

                            ④ ‘비회원’이라 함은 회원에 가입하지 않고 “PREW”가 제공하는 서비스를 이용하는 자를 말합니다.
                            </p>
                        </ScrollPanel>
                    </label>
                </div>
                <div className={`${styles.label}`}>
                    <label style={{ marginBottom: '40px'}}>
                        <Checkbox
                        id="secondCheck"
                        onChange={(e) => onCheckHandler(e, 'secondCheck')}
                        checked={checkedInputs.includes('secondCheck') ? true : false}
                        style={{ marginRight: '10px'}}
                        />[필수] 개인정보 수집 및 이용 동의
                        <ScrollPanel style={{ width: '100%', height: '200px' }} className="custombar1">
                            <p>
                            1. **개인정보의 처리 목적**
                            [(주)프류]('[https://www.PREW.kr](https://www.prew.kr/)'이하 'PREW')은(는) 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.
                                
                                가. 홈페이지 회원가입 및 관리
                                회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 고충처리, 분쟁 조정을 위한 기록 보존 등을 목적으로 개인정보를 처리합니다.
                                
                                나. 민원사무 처리
                                민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등을 목적으로 개인정보를 처리합니다.
                                
                                다. 재화 또는 서비스 제공
                                서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증 등을 목적으로 개인정보를 처리합니다.
                                
                                라. 마케팅 및 광고에의 활용
                                신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 인구통계학적 특성에 따른 서비스 제공 및 광고 게재 , 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.
                            </p>
                        </ScrollPanel>
                    </label>
                </div>

                <Button label="확인" type="button" onClick={onClickAgree} className={`${styles.label} mt-0`}/>
            </div>
        )
    } else if (step === 2){
        stepSignUp = (
            <div className={`${styles.formDiv}`}>
                <p className={`${styles.form}`}>회원가입 방식을 선택해 주세요.</p>
                <div className={`${styles.form}`}>
                    <p>SNS로 회원가입 하기</p>
                    {/* SNS 회원가입 버튼 넣기 */}
                    <hr></hr>
                </div>
                <div className={`${styles.form}`}>
                    <p>이메일로 회원가입 하기</p>
                </div>
                <Button label="이메일로 회원가입" type="button" onClick={onClick} className={`${styles.form} mt-0`}/>
            </div>
        )
    } else if (step === 3){
        stepSignUp = (
            <div>
                <div className={`${styles.form}`}>
                    <InputText placeholder="이름"id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className={`${styles.form}`}>
                    <InputText placeholder="닉네임"id="name" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                </div>
                <div className={`${styles.form} ${styles.between}`}>
                    <InputText placeholder="이메일"id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Button label="인증번호 받기" type="submit" disabled={loading} className={`${styles.button}`} />
                </div>
                <div className={`${styles.form}`}>
                    <InputText placeholder="인증번호"id="number" value={number} onChange={(e) => setNumber(e.target.value)}/>
                </div>
                <div className={`${styles.form}`}>
                    <Password placeholder="비밀번호 (문자, 특수문자, 숫자를 포함해주세요)"id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask/>
                </div>
                <div className={`${styles.form}`}>
                    <Password placeholder="비밀번호 확인"id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} feedback={false} toggleMask/>
                </div>
                <Button label="회원가입 하기" type="submit" disabled={loading} className={`${styles.form} mt-0`}/>
            </div>
        )
    }


    return (
        <div className={styles.div}>
            <h2 className={styles.logo}>
                <span className={styles.logoColor}>PREW</span>
            </h2>

            {/* 이메일 회원가입 폼 */}
            <div>
                <form onSubmit={onSubmit} className={`card ${styles.formDiv}`}>
                    <p>{alertMsg}</p>
                    {!result && stepSignUp}
                </form>
            </div>
        </div>
    );
};

export default SignUp;