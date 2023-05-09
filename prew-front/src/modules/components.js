import React from "react";

const Home = React.lazy(() => import("../pages/home/Home"));
const Login = React.lazy(() => import("../pages/accounts/Login"));
const SignUp = React.lazy(() => import("../pages/accounts/SignUp"));
const FindPassword = React.lazy(() => import("../pages/accounts/FindPassword"));
const DeleteUser = React.lazy(() => import("../pages/accounts/DeleteUser"));
const Profile = React.lazy(() => import("../pages/profile/Profile"));
const PostsList = React.lazy(() => import("../pages/posts/PostsList"));
const Post = React.lazy(() => import("../pages/posts/Post"));
const PostsWriting = React.lazy(() => import("../pages/posts/PostsWriting"));
const NotFound = React.lazy(() => import("../components/NotFound"));

export { Home, Login, SignUp, FindPassword, DeleteUser, Profile, PostsList, Post, PostsWriting, NotFound };
