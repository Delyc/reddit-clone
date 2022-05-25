import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosBase from "../api";

function CreatePost() {
  const [options, setOptions] = useState();
  useEffect(() => {
    const getOpt = async () => {
      try {
        const res = await axiosBase.get("/reddits/options", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setOptions(res.data.data);
        console.log("sub", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOpt();
  }, []);
  const createSub = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await axiosBase.post("/reddits/sub", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className="form-post">
      {options ? (
        <form onSubmit={(e) => createSub(e)} encType="multipart/form-data">
          <select name="subreddit" required className="form-control">
            <option value="" hidden>
              Select subreddit...
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <input className="img-fl" required type="file" name="image" accept="image/*" />
          <input className="form-control" name="title" placeholder="title" />

          <textarea
            className="form-control"
            name="body"
            required
            placeholder="body"
          />
          <input className="btn-add-post" type="submit" value="Submit" />
        </form>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default CreatePost;
