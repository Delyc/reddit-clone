import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axiosBase from "../api";

const Readmore = () => {
  const { id } = useParams();
  const [post, setpost] = useState();
  const [err, setErr]=useState("")
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axiosBase.get("/reddits/sub/" + id);
        setpost(res.data.data);
        console.log(res.data)
      } catch (error) {
        console.log(error);
        setErr(error?.response?.data?.errors || error.message)
      }
    };
    getPost();
  }, []);
  const { register, handleSubmit } = useForm();

  const commentUrl = `/comments/${id}`;

  const onSubmit = async (data) => {
    try {
      const res = await axiosBase.post(commentUrl, data);
      console.log(res)
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="more">
      <p>{err}</p>
      {post ? (
        <>
        <div className="post-more">
        <h1>{post.reddit.title}</h1>
        <img className="post-img" src={post.reddit.image} alt="" />
          <p>{post.reddit.body}</p>
        </div>
          

          <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <textarea
                className="form-control"
                placeholder="Comment"
                {...register("body", {
                  minLength: 10,
                  required: true,
                })}
              ></textarea>
              <button className="comment" type="submit">comment</button>
            </form>
          </div>

          <div className="post-com">
            <h4>commmets</h4>
            {post.comments.map((comment) => {
              return <div className="comuser"> <p>{comment.body} by <span>{comment.user.firstName}</span>  </p> 
              
                </div>;
            })}
          </div>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default Readmore;
