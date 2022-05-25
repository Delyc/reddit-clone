import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosBase from "../api";

function CreateSubreddit() {
  const createsubreddit = async (data) => {
    try {
      const res = await axiosBase.post("/reddits", data);
      console.log(res);
    } catch (error) {
      console.error(error);
      setErr(error?.response?.data?.errors || error.message);
    }
  };

  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState();

  return (
    <div className="subreddit">
      <h4>Add a subreddit</h4>
      <form onSubmit={handleSubmit((data) => createsubreddit(data))}>
        <input {...register("title")} placeholder="subreddit name" />
        <textarea {...register("summary")} placeholder="descriptin..." />
        <input className="submit-sub" type="submit" />
      </form>
    </div>
  );
}

export default CreateSubreddit;
