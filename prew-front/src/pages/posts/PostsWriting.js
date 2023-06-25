import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Chips } from "primereact/chips";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from 'react-hook-form';
import styles from '../../style/pages/posts/PostsWriting.module.scss'


const PostsWriting = () => {
    const [title, setTitle] = useState(''); // 제목

    const [dates, setDates] = useState(null); // 기간 선택 폼

    // 인원수 선택 폼
    const [value, setValue] = useState('');
    const items = [...Array(9).keys()].map((item) => item + 1);
    items.push('10+');

    // 지역 선택 폼
    const [region, setRegion] = useState('');
    const item = ['서울', '부산', '인천', '대구', '대전', '광주', '울산', '세종', '경기', '충북', '충남', '전북', '전남', '경북', '경남', '강원', '제주'].sort()

    // 스킬 선택 폼 (해시태그형)
    const [skills, setSkills] = useState([])

    // 게시글 카테고리 선택 폼
    const [selectedCategory, setSelectedCategory] = useState(null);
    const category = [
        { category: '스터디' },
        { category: '프로젝트' },
        { category: '공모전' },
    ];

    // 게시물 작성 폼
    const defaultValues = {
        blog: ''
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };


    return (
        <div className={styles.div}>
            <div className={styles.topDiv}>
                <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={category} optionLabel="category" 
                    placeholder="카테고리를 골라주세요" className="w-14rem" />
                <Button label='작성완료' className="w-8rem" rounded />
            </div>
            <InputText value={title} onChange={(e) => setTitle(e.target.value)} className={styles.title} placeholder='제목을 입력해주세요' />
            <div className={styles.midDiv}>
                <table className='w-full'>
                    <tbody>
                        <tr>
                            <td className={styles.td}>기간</td>
                            <td>
                            <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput className='w-full' />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>인원</td>
                            <td>
                            <Dropdown value={value} onChange={(e) => setValue(e.value)} options={items} placeholder="인원수를 선택해주세요" className="w-full" />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>지역</td>
                            <td>
                            <Dropdown value={region} onChange={(e) => setRegion(e.value)} options={item} placeholder="지역을 선택해주세요" className="w-full" />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>스킬</td>
                            <td className={`card p-fluid w-full`}>
                                <Chips value={skills} onChange={(e) => setSkills(e.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="blog"
                        control={control}
                        rules={{ required: 'Content is required.' }}
                        render={({ field }) => <Editor id={field.name} name="blog" value={field.value} onTextChange={(e) => field.onChange(e.textValue)} style={{ height: '320px' }} />}
                    />
                    <div className="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                        {getFormErrorMessage('blog')}
                        <Button type='submit' label='작성완료' className="w-8rem" rounded />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostsWriting;