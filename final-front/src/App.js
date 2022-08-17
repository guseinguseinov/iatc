import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Courses from "./pages/Courses/Courses";
import CourseDetail from "./pages/CourseDetail/CourseDetail";
import Events from "./pages/Events/Events";
import EventDetail from "./pages/EventDetail/EventDetail";
import Teachers from "./pages/Teachers/Teachers";
import TeacherDetail from "./pages/TeacherDetail/TeacherDetail";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course-detail/:id" element={<CourseDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event-detail/:id" element={<EventDetail />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teacher-detail/:id" element={<TeacherDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog-detail/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
