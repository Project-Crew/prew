import React, {useState} from 'react';
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import styles from "../../style/pages/accounts/DeleteUser.module.scss";

const DeleteUser = () => {
    const [allChecked, setAllChecked] = useState(false);

    return (
        <div className={styles.div}>
            <h1 className='mb-3'>회원탈퇴 <span className={styles.span}>탈퇴시 주의사항을 꼭 확인해 주세요.</span></h1>
            <div className={styles.box} style={{height:'2px'}}></div>
            <div className={styles.blue}>회원탈퇴 주의사항</div>
            <div className={styles.box} style={{height:'1px'}}></div>

            <div className={styles.numBox}>
                <div className={styles.round}>1</div>
                <div className={styles.text}>
                    <p className={styles.title}>모든 게시물 및 댓글 삭제</p>
                    <p>
                        모든 게시물 및 댓글 삭제관련 사항모든 게시물 및 댓글 삭제관련 사항
                        모든 게시물 및 댓글 삭제관련 사항모든 게시물 및 댓글 삭제관련 사항
                        모든 게시물 및 댓글 삭제관련 사항
                    </p>
                </div>
            </div>
            <div className={styles.numBox}>
                <div className={styles.round}>2</div>
                <div className={styles.text}>
                    <p className={styles.title}>탈퇴후 이용 제한</p>
                    <p>
                        모든 게시물 및 댓글 삭제관련 사항모든 게시물 및 댓글 삭제관련 사항
                        모든 게시물 및 댓글 삭제관련 사항모든 게시물 및 댓글 삭제관련 사항
                        모든 게시물 및 댓글 삭제관련 사항
                    </p>
                </div>
            </div>
            <div className={styles.numBox}>
                <div className={styles.round}>3</div>
                <div className={styles.text}>
                    <p className={styles.title}>같은 메일 재가입 제한</p>
                    <p>
                        모든 게시물 및 댓글 삭제관련 사항모든 게시물 및 댓글 삭제관련 사항
                        모든 게시물 및 댓글 삭제관련 사항모든 게시물 및 댓글 삭제관련 사항
                        모든 게시물 및 댓글 삭제관련 사항
                    </p>
                </div>
            </div>

            <div className={`${styles.box} mt-5`} style={{height:'1px'}}></div>

            <form className={styles.buttonBox}>
                <div className='mt-5'>
                    <Checkbox onChange={e => setAllChecked(e.checked)} checked={allChecked}></Checkbox>
                    <label className='ml-3'>위의 회원탈퇴 시 주의사항을 모두 확인하였습니다.</label>
                </div>
                <Button label="회원탈퇴" type="submit" className={`${styles.button} mt-5`} />
            </form>
        </div>
    );
};

export default DeleteUser;