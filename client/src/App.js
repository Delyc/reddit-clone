import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePost from "./containers/CreatePost";
import CreateSubreddit from "./containers/CreateSubreddit";
import GetAllSubredits from "./containers/GetAllSubredits";
import Hom from "./containers/Hom";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Subreddit from "./containers/Subreddit";

import Navbar from "./components/navbar/Navbar";
import Readmore from "./containers/Readmore";
function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Hom />} />
        <Route path="/sign" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subreddit" element={<Subreddit />} />
        <Route path="/createsub" element={<CreateSubreddit />} />
        <Route path="/getsub" element={<GetAllSubredits />} />
        <Route path="/create" element={<CreatePost />}></Route>
        <Route path="/navbar" element={<Navbar />}></Route>
        <Route path="/view/:id" element={<Readmore />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
