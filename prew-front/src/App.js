import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, SignUp, FindPassword, DeleteUser, Profile, PostsList, Post, PostsWriting, NotFound } from "./modules/components";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AppLayout from "./components/AppLayout";
import Loading from "./components/Loading";
function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accounts/login" element={<Login />} />
            <Route path="/accounts/sign-up" element={<SignUp />} />
            <Route path="/accounts/find-password" element={<FindPassword />} />
            <Route path="/accounts/unregister" element={<DeleteUser />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts/posts-list" element={<PostsList />} />
            <Route path="/posts/:postsId" element={<Post />} />
            <Route path="/posts/posts-writing" element={<PostsWriting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
