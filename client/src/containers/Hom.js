import React, { useEffect, useState } from "react";
import axiosBase from "../api";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import up from "../assets/upvote.png"
import down from "../assets/downvote.png"
import comm from "../assets/comment.png"
import voted from "../assets/voted.png"
import downvoted from "../assets/downvoted.png"
function Hom() {
  const [sub, setSub] = useState();
  const [reddits, setRedits] = useState();
  const upvote = async (e, id) => {
    try {
      const res = await axiosBase.post(`/comments/${id}/up`);
      console.log(res.data);
      e.target.innerHTML = `<img src=${voted} alt="" />(${res.data.data.meta.upvotes})`;
    } catch (error) {
      console.log(error);
    }
  };
  const downvote = async (e, id) => {
    try {
      const res = await axiosBase.post(`/comments/${id}/down`);
      console.log(res.data);
      e.target.innerHTML = `<img src=${downvoted} alt="" />(${res.data.data.meta.downvotes})`;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getSub = async () => {
      try {
        const res = await axiosBase.get("/reddits/sub", {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        });
        const res2 = await axiosBase.get("/reddits/all");
        setSub(res.data.data.reddits);
        setRedits(res2.data.data.reddits);
        console.log("sub", res2.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSub();
  }, []);
  return (
    <>
     <Navbar />
    <div className="home">
     
      <div className="row">
      <div className="col-md-3">
        <h3>subreddits</h3>
        {sub ? (
          sub.map((subreddits, index) => {
            return <div className="sub" key={index}>{subreddits.title}
             </div>;
           
          })
          
        ) : (
          <h1>Loading...</h1>

        )}
        <button className="add-sub-home"> <Link to="/createsub" className="add-sub-home-text"> add subreddit</Link></button>
      </div>
      
      <div className="col-md-9">
        {reddits && (
          <div className="post">
            {reddits.map((reddit) => {
              return (
                <div className="posts">
                  <div className="spost">
                  <h2><Link className="posttitle" to={`/view/${reddit._id}`}>{reddit.title}</Link></h2>
                
                  <img className="post-img" src={reddit.image} alt="" />
                  <div>{reddit.body}</div>
                  <div className="button-group">
                    
                    
                    <button
                      onClick={(e) => upvote(e, reddit._id)}
                      
                    > <img src={up} alt="" /> ({reddit?.meta?.upvotes || 0})
                    </button>
                    <button
                      onClick={(e) => downvote(e, reddit._id)}
                     
                    > 
                      <img src={down} alt="" /> ({reddit?.meta?.downvotes || 0})
                    </button>
                    <button><Link className="" to={`/view/${reddit._id}`}><img src={comm} alt="" /></Link></button>
                  </div>
                  </div>
                 
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      
    </div>
    
    </div>
    </>
    
  );
}

export default Hom;
