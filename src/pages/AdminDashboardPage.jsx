import React, { useEffect } from "react";
import { AuthContext } from "../authContext";
import MkdSDK from "../utils/MkdSDK";

const AdminDashboardPage = () => {
  const { dispatch } = React.useContext(AuthContext);
  const role = JSON.parse(localStorage.getItem("role"));


  const handleLogout = (event) => {
    event.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
  }


  const callRestPaginateAPI = async () => {
    let sdk = new MkdSDK();

    try {
      const response = await sdk.check(role);
      const responseCheck = await response.json();
      console.log("responseCheck",responseCheck);
    } catch (error) {
      if (error.message === "TOKEN_EXPIRED") {
        dispatch({
          type: "LOGOUT",
        });
        window.location.href = "/" + role + "/login";
      } else {
        console.log(error.message);
      }
    }

    try {
      const response = await sdk.callRestAPI({ page:1 , limit:10 } , "GET");
      const responseData = await response.json();
      console.log("response p--------------------------------< ",responseData);


    } catch (error) {
      // if (error.message === "TOKEN_EXPIRED") {
      //   dispatch({
      //     type: "LOGOUT",
      //   });
      //   window.location.href = "/" + role + "/login";
      // } else {
      //   console.log(error.message);
      // }
    }
  }

  useEffect(()=> {
    callRestPaginateAPI()
  },[])

  return (
    <>
    <div className="flex justify-between items-center">
      <div>
        <h1 style={{fontSize: '40px', fontWeight: 900}}>APP</h1>
      </div>
      <div className="col-auto">
      <button type="submit" onClick={handleLogout} style={{background: 'green', color: 'white', borderRadius: '30px', padding: '5px 10px'}}>Logout</button>

      </div>
    </div>


    <div className="grid grid-cols-6">
      <div className="col col-1">id</div>
      <div className="col col-1">
        <img width="100px" height="100px" src="" />
      </div>
      <div className="col col-2">movie name</div>
      <div className="col col-1">Author</div>
      <div className="col col-1">likes</div>
    </div>

    </>
  );
};

export default AdminDashboardPage;
