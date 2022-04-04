import React, {useEffect, useState} from "react";
import "./Playlist.css";
import {useGetAuth} from '../../Hooks/useGetAuth';
import Profile from "../Profile/Profile";
import axios from "axios";

function SideMenu({setToken}) {
    const {redirect, callback} = useGetAuth();
    const isAuth = localStorage.getItem('isAuth');
    const [userData, setUserData] = useState([]);

    useEffect(()=> {
        if (window.location.hash) {
            const token = callback().access_token
            if (token) {
              setToken(token);
              localStorage.setItem("accToken",token);
              localStorage.setItem("isAuth", JSON.stringify(true));
              window.location.hash = "";
              handleGetProfile(token);
            //   window.location.href = "/";
            }
          } else if (isAuth) {
            console.log("you are already logged in");
          }
        }, [isAuth]);
    
    const handleLogout = () => {
        localStorage.removeItem("accToken");
        localStorage.removeItem("isAuth");
        window.location.reload();
    }
    const handleGetProfile = async (token) => {
        let result;
        try {
            result = await axios.get(
                `https://api.spotify.com/v1/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(result.data.tracks.items);
            // store fetch result to searchRes
            setUserData(result.data.tracks)
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <h1 className="text-center txt-create">Create Playlist</h1>
            <div className="form-wrapper mb-3">
                <form className="form">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Your title here"
                            name="title"
                            id="title"
                        />
                        <label>Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea
                            className="form-control"
                            placeholder="describe your playlist"
                            name="description"
                            id="description"
                            defaultValue={""}
                        />
                        <label>Description</label>
                    </div>
                    <button
                        className="btn btn-primary rounded-pill"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <hr/>
            {
                isAuth ?
                (<> <Profile data={userData}/>               <a className="mb-3 login-btn" onClick={handleLogout}>Logout</a></>)
                :
                (<a className="mb-3 login-btn" onClick={() => {redirect()}}>Login</a>)

            }
        </>
    );
}

export default SideMenu;
