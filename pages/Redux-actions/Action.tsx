import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "react-query";

// =============POST COMMENT=============
export const postComment = (comment: string,id: any) => {
  return (dispatch: any) => {
    // const date = Date.now()
    // let minute = date.getMinutes()
   const data ={
     text: comment,
     postId: id,
    //  date: 
   }
    axios.post("https://blog-mern-api-node.herokuapp.com/api/comment", data, {
      headers: {
        "x-access-token": ` ${Cookies.get("token")}`,
      }
    })
    .then((res) => {
      alert('COMMENT BERHASIL!')
      console.log(res.data)
    })
    .catch(err => console.log(err.response.data.message))
   
  };
};
// =============END=============

// =============GET POST =============
export const getPostAll =  () => {
  return (dispatch:any) => {
    axios.get('https://blog-mern-api-node.herokuapp.com/api/posts')
    .then((res) => {
      console.log(res.data,'ACTION')
      dispatch({
        type:'GET_DATA',
        payload:res.data.posts
      })
    })
    .catch((err) => {
      const error = err.response.data.message
      console.log(error)
    })
  }
}

// =============END=============


export const setLogin = (username: string, password: string) => {
  return (dispatch: any) => {
    //   toast.loading('Loading...')
    axios
      .post("https://blog-test-api-mern.herokuapp.com/user/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        // const token = res.data.token;
        console.log(res.data);
        // Cookies.set("token", token);
        // dispatch({
        //   type: "SET_LOGIN",
        //   payload: res.data,
        // });
        toast.success("Login Success");
        Router.push("/");
      })
      .catch((res) => {
        console.log(res, "<<< ERROR");
        toast.error("Login Failed");
      });
  };
};

export const setDataPost = (title: string,image: any,editorState: any,description: string) => {
  return () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", editorState);
    formData.append("description", description);
    formData.append("image", image);

    axios
      .post("https://blog-mern-api-node.herokuapp.com/api/post", formData, {
        headers: {
          "x-access-token": ` ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("BERHASIL");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};

export const setRegister = (
  firstName: string,
  password: string,
  email: string,
  lastName: string
) => {
  return (dispatch: any) => {
    axios
      .post("https://blog-website-backendnodejs.herokuapp.com/user/register", {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
      })
      .then((res: any) => {
        toast.success('Successfully Registered"');
        const accessToken: any = res.data.accessToken;
        const refreshToken: any = res.data.refreshToken;
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);

        // console.log(res.data);
        dispatch({
          type: "SET_REGISTER",
          payload: res.data,
        });
        Router.push("/login");
      })
      .catch((err) => {
        toast.error("Upps, Something Wrong");
        console.log(err);
      });
  };
};
