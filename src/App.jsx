import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ArticleView from "./components/ArticleView";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:topic" element={<Home />} />
            <Route path="/articles/:article_id" element={<ArticleView />} />
            <Route path="*" element={<ErrorPage err="Page not found!" />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
