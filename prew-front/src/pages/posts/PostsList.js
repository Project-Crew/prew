import React, { useState, useEffect } from 'react';
import styles from "../../style/pages/posts/PostList.module.scss"
import { Dropdown } from 'primereact/dropdown';

const PostsList = () => {
    const [allPosts, setAllPosts] = useState([]);
    const dummyPosts = [
        {
          id: 1,
          title: "내가쓴 게시물 제목이다.1",
          content: "게시물 내용",
          date: "2023.05.04",
          author: "myPost",
        },
        {
          id: 2,
          title: "내가쓴 게시물 제목이다.2",
          content: "게시물 내용",
          date: "2023.05.04",
          author: "eun",
        },
        {
          id: 3,
          title: "내가쓴 게시물 제목이다.3",
          content: "게시물 내용",
          date: "2023.05.04",
          author: "h",
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


    return (
        <div>
            <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={category} optionLabel="category" 
                    placeholder="스터디" className="w-14rem m-3" />
            <div className='ml-3'>
                {allPosts.map((post) => (
                    <div className={styles.card}>
                        <div className={styles.components}>
                            <p className={styles.date}>{ post.date }</p>
                            <h3 className={styles.texts}>{ post.title }</h3>
                            <p className={styles.texts}>{ post.content }</p>
                            <p className={styles.author}>{ post.author }</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostsList;