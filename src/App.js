import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Loading from './component/Loading';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import useFetch from './util/useFetch';

function App() {
  /* get 메소드를 통해 데이터를 받아오는 useEffect hook은 컴포넌트 내 여기저기 존재하고 있습니다. */
  /* 해당 hook은 반복이 되는 부분이 있으므로 어떻게 custom hook으로 만들 수 있을지 고민해 봅시다. */
  /* util 폴더 내에 존재하는 useFetch에 custom hook을 작성해 주세요. */
  const [blogs, isPending, error] = useFetch(`http://localhost:3001/blogs`);

  /* react.lazy()와 suspense를 사용해 App 컴포넌트를 리팩토링 해보세요. */
  const CreateBlogComponent = lazy(() => import('./blogComponent/CreateBlog'));
  const BlogDetailsComponent = lazy(() => import('./blogComponent/BlogDetail'));
  const NotFoundComponent = lazy(() => import('./component/NotFound'));

  return (
    <BrowserRouter>
      {error && <div>{error}</div>}
      <div className="app">
        <Navbar />
        <div className="content">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                exact
                path="/"
                element={<Home blogs={blogs} isPending={isPending} />}
              />
              <Route
                path="/create"
                element={<CreateBlogComponent data={blogs} />}
              />
              <Route path="/blogs/:id" element={<BlogDetailsComponent />} />
              <Route path="/blogs/:id" element={<NotFoundComponent />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
