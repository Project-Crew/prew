import React, { useState, useEffect } from 'react';
import styles from "../../style/pages/posts/PostList.module.scss"
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const PostsList = () => {
    const [allPosts, setAllPosts] = useState([]);
    const dummyPosts = [
        {
          id: 1,
          title: "내가쓴 게시물 제목이다.1",
          content: "게시물 내용",
          date: "2023.05.04",
          author: "myPost",
          likes: 3,
          scraps: 2,
        },
        {
          id: 2,
          title: "내가쓴 게시물 제목이다.2",
          content: "게시물 내용",
          date: "2023.05.04",
          author: "eun",
          likes: 3,
          scraps: 2,
        },
        {
          id: 3,
          title: "내가쓴 게시물 제목이다.3",
          content: "게시물 내용",
          date: "2023.05.04",
          author: "h",
          likes: 3,
          scraps: 2,
        },
        {
          id: 4,
          title: `내가쓴 게시물 제목이다.
          내가쓴 게시물 제목이다.
            내가쓴 게시물 제목이다.
            내가쓴 게시물 제목이다.내가쓴 게시물 제목이다.`,
          content: "게시물 내용",
          date: "2023.05.04",
          author: "myPost",
          likes: 3,
          scraps: 2,
        },
    ];

    useEffect(() => {
        const posts = dummyPosts;
        setAllPosts(posts);
    }, []);

    // 게시글 카테고리 선택 폼
    const [selectedCategory, setSelectedCategory] = useState('스터디');
    const category = [
        { category: '스터디' },
        { category: '프로젝트' },
        { category: '공모전' },
    ];

    const [recruiting, setRecruiting] = useState(true);
    const is_recruiting = [
        { is_recruiting: true },
        { is_recruiting: false },
    ];


    return (
        <div className={styles.div}>
            <div className="m-3">
                <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={category} optionLabel="category" 
                        placeholder="스터디" className='w-14rem' />
                        
                {/* Button 클릭 시, 다른 버튼은 text 모드로 전환하는 코드 구현 필요 */}
                <Button value={recruiting} onChange={(e) => setRecruiting(e.value)} checked={is_recruiting === 'true'} rounded className='ml-4'>모집중</Button>
                <Button value={recruiting} onChange={(e) => setRecruiting(e.value)} checked={is_recruiting === 'false'} text rounded>모집완료</Button>
            </div>
            <div className='ml-3'>
                {allPosts.map((post) => (
                    <div className={styles.card}>
                        <div className={styles.components}>
                            <p className={styles.date}>{ post.date }</p>
                            <h3 className={styles.texts}>{ post.title }</h3>
                            <p className={styles.texts}>{ post.content }</p>
                            <div className={styles.authorDiv}>
                                <span>{ post.author }</span>
                                <i className='pi pi-thumbs-up ml-auto'></i>
                                <span className='ml-2'>{ post.likes }</span>
                                <i className='pi pi-paperclip ml-3'></i>
                                <span className='ml-2'>{ post.scraps }</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostsList;