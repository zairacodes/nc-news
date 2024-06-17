import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ArticleView from "./components/ArticleView";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:article_id" element={<ArticleView />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
