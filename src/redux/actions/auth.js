import axios from "axios";

import auth from "@react-native-firebase/auth";
import { storeurl } from "./storeurl";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  PROFILE_INFO,
  TRANSLATION,
} from "../actions/types";
import { Alert } from "react-native";

export const authState = (rsl, rej) => {
  return (dispatch) => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        rsl(user);
        try {
          setTimeout(() => {
            auth().signOut();
          }, 60000);
        } catch {}
      }
    });
  };
};
////////////////////////////////////////////////////////////////////apis

export const updatedriverProfile = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}update_driver_details`, data, {});

    if (res.data.status == true) {
      dispatch({
        type: PROFILE_INFO,
        user: res.data.data,
        isLoggedIn: true,
      });
    }

    return res;
  };
};

export const apppushnotification = (mydata) => {
  return async (dispatch) => {
    let title = "Taximat";
    let scree_name = mydata.scree_name;
    let messagekey = mydata.messagekey;
    let receiverid = mydata.receiverid;
    let screen = mydata.screen;
    let dname = mydata.dname;
    let devicetokennew = mydata.device_token;
    let to = mydata.token;
    let body = mydata.body;
    const headers = {
      Authorization: `key=AAAAD3PmW7A:APA91bGK_INKNDII1BS5GrvKvXlYsNX3nwMsbCA7f23vDKdmJQbvp1O0dZ8WKbK2ni-zAfzyK0NdNoE4UbUhI4nCC7JJysYw51eA71hpaL9Qx1J8iC2sP8jl2qX6bSJDAehOcADZxUWq`,
      "Content-Type": "application/json",
    };
    const bodyToSend = JSON.stringify({
      to: to,
      notification: {
        title,
        body,
      },
      data: {
        scree_name,
        messagekey,
        receiverid,
        screen,
        dname,
        devicetokennew,
      },
    });

    const res = await axios({
      method: "post",
      url: "https://fcm.googleapis.com/fcm/send",
      headers: headers,
      data: bodyToSend,
    });
    return res;
  };
};

///////////////////////update prefrancesadd

export const prefrancesadd = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${storeurl}update_driver_preference`,
      data,
      {}
    );

    return res;
  };
};

/////////////////////// Block Driver///////////////////////

export const getBlockdriver = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}blocked_passengers`, data, {});

    return res;
  };
};

/////////////////////// unblockpasanger///////////////////////

export const unblockdriver = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}unblock_user`, data, {});

    return res;
  };
};

/////////////////////// searchdriver Driver///////////////////////

export const searchdriver = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}search_user_for_block`, data, {});

    return res;
  };
};

/////////////////////// block driver///////////////////////

export const blockdriver = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}add_user_to_block`, data, {});

    return res;
  };
};

/////////////////////// block driver///////////////////////

export const adddriverfaviriot = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}add_user_to_favourite`, data, {});

    return res;
  };
};

//////////////////////addfavlocation///////////////////////

export const addfavlocation = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}make_location_fav`, data, {});
    return res;
  };
};

//////////////////////updatetoken///////////////////////

export const updatetoken = (data, navigation) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}updatetoken`, data, {});
    console.log("fomData===>123456", res);
    if (res.data.status == true) {
      if (res.data.data.user_privilidge == 1) {
        dispatch({
          type: LOGOUT_USER,
        });
        navigation.navigate("Signup");
      } else {
        dispatch({
          type: PROFILE_INFO,
          user: res.data.userdata,
          isLoggedIn: true,
        });
      }
    }

    return res;
  };
};

export const cancelride = (data, navigation) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}update_trip_status`, data, {});
    console.log("myfinaldata", res);
    return res;
  };
};

/////////////////////// sos///////////////////////

export const sendsos = (data, rsl, rej) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}unblock_user`, data, {});

    return res;
  };
};

///////////////////////  trip history///////////////////////

export const getTriphistory = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}trip_history_enduser`, data, {});

    return res;
  };
};

///////////////////////withdrawammount///////////////////////

export const withdrawammount = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}withdrawl_amount`, data, {});

    return res;
  };
};

///////////////////////if_ride_accepted///////////////////////

export const rideaccepted = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}if_ride_accepted`, data, {});

    return res;
  };
};

////////////////////////////////My Locations Or Addresses//////////////////////

export const getMylocations = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}my_fav_locations`, data, {});

    return res;
  };
};

/////////////////////// DeleteLocation///////////////////////

export const DeleteLocation = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}delete_my_locations`, data, {});
    return res;
  };
};

////////////////////////Edit Profile///////////////////////

export const updateProfile = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${storeurl}update_user_details_enduser`,
      data,
      {}
    );

    console.log("update profile", res.data.data);
    if (res.data.status == true) {
      dispatch({
        type: PROFILE_INFO,
        user: res.data.data,
        isLoggedIn: true,
      });
    }
    return res;
  };
};

/////////////////////// billingpayment///////////////////////

export const paypayment = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}transaction`, data, {});
    console.log("update transaction", res);
    if (res.data.status == true) {
      dispatch({
        type: PROFILE_INFO,
        user: res.data.data,
        isLoggedIn: true,
      });
    }
    return res;
  };
};
/////////////////////// view tripcoast ///////////////////////
export const addammountfortrip = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}add_amount_for_trip`, data, {});
    return res;
  };
};

/////////////////////// billingpayment///////////////////////

export const paypaymentride = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}transaction`, data, {});
    return res;
  };
};

///////////////////////  driverList///////////////////////

export const driverList = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}list_of_drivers`, data, {});
    return res;
  };
};

///////////////////////  getpaymentdetail///////////////////////

export const getpaymentdetail = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}getpaymentdetails`, data, {});
    return res;
  };
};

///////////////////////  placeorder///////////////////////

export const placeorder = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}start_trip`, data, {});
    return res;
  };
};

///////////////////////  driverList///////////////////////

export const ongoingtrip = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}ongoing_trip`, data, {});
    return res;
  };
};

///////////////////////  driverList///////////////////////

export const contactusapi = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}contact_us`, data, {});
    return res;
  };
};

//////////////////////////////////////////
export const signInWithPhone = (phone) => {
  return async (dispatch) => {
    const res = await auth().signInWithPhoneNumber(phone);
    return res;
  };
};

export const confirmOTP = (otp, confirmation, rsl, rej) => {
  console.log("conformation from api1", otp, confirmation);
  return async (dispatch) => {
    const res = await confirmation.confirm(otp);
    console.log("conformation from api2", res);

    return res;
  };
};
//////signup
export const signin = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}login_user`, data, {});
    console.log("response from auth", res);
    if (res.data.status == true) {
      if (res.data.data.user_privilidge == 1) {
        alert("Your account is blocked");
      } else {
        dispatch({
          type: LOGIN_USER,
          user: res.data.data,
          isLoggedIn: true,
        });
        return res;
      }
    } else {
      return res;
    }
  };
};
export const signup = (data, rsl, rej) => {
  console.log(data);
  return (dispatch) => {
    const res = axios(`${storeurl}api/signup`, {
      data,
      method: "post",
    })
      .then((res) => {
        if (res.data.status == true) {
          dispatch({
            type: LOGIN_USER,
            user: res.data.data[0],
            token: res.data.data[0].auth,
            isLoggedIn: true,
          });
          rsl();
        } else {
          rej(res.data.message);
          dispatch({
            type: LOGIN_USER,
            isLoggedIn: false,
          });
        }

        // rsl(res);
      })
      .catch((err) => {
        console.log("err", err);
        rej(err.message);
      });
  };
};

export const deleteacct = (data, rsl, rej) => {
  console.log(data);
  return (dispatch) => {
    const res = axios(`${storeurl}api/deleteaccount`, {
      data,
      method: "post",
    })
      .then((res) => {
        if (res.data.status == true) {
          // dispatch({
          //   type: LOGOUT_USER,
          // });

          rsl(true);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
        rej(err.message);
      });
  };
};

export const signupwithfb = (data, rsl, rej) => {
  console.log("Comming" + JSON.stringify(data));
  return async (dispatch) => {
    await axios
      .post(`${storeurl}api/loginwithfb`, data, {})
      // .post('https://ranaentp.net/nikkahnama/index.php', data)

      .then((res) => {
        console.log(res);

        if (res.data.status == true) {
          dispatch({
            type: LOGIN_USER,
            user: res.data.data[0],
            token: res.data.data[0].auth,
            isLoggedIn: true,
          });
          rsl(res.data);
        } else {
          rej(res.data.message);
          dispatch({
            type: LOGIN_USER,
            isLoggedIn: false,
          });
        }
      })

      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};

export const accessrequest = (data, auth) => {
  console.log("myresnew", data);
  return async (dispatch) => {
    try {
      const res = await axios.post(`${storeurl}api/accessrequest`, data, {
        headers: {
          auth: auth,
        },
      });
      return res;
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const resetPassword = (data, rsl, rej) => {
  return async (dispatch) => {
    await axios(`${storeurl}api/resetpassword`, {
      data,
      method: "post",
    })
      .then((res) => {
        console.log(res);
        rsl(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
export const updateAccount = (data, auth, phone, rsl, rej) => {
  return async (dispatch) => {
    await axios(`${storeurl}api/account_setting`, {
      data,
      method: "post",
      headers: {
        auth: auth,
        phone_no: phone,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          dispatch({
            type: PROFILE_INFO,
            user: res?.data?.data[0],
            token: res?.data?.data[0]?.auth,
            isLoggedIn: true,
          });
        }
        rsl(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
export const logoutSuccess = (rsl, rej) => {
  console.log("logiut is ", rsl);
  return (dispatch) => {
    try {
      dispatch({
        type: LOGOUT_USER,
      });
      rsl();
    } catch (err) {
      rej(err.message);
    }
  };
};
export const checkPhoneNo = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/check_phone_no`, data);
    return res;
  };
};

// Profile Info
export const updateProfileIno = (data, auth) => {
  console.log("my formdata1", data);
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/profile_information`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
      dispatch({
        type: PROFILE_INFO,
        user: res?.data?.data[0],
        token: res?.data?.data[0]?.auth,
        isLoggedIn: true,
      });
    }
    return res;
  };
};

export const updateuserinfo = (data) => {
  console.log("my formdata1", data);

  // return async dispatch => {

  //   dispatch({
  //     type: PROFILE_INFO,
  //     user: data,
  //     token: data.auth,
  //     isLoggedIn: true,
  //   });

  // };
};

export const updateProfileIno1 = (data, auth, rsl, rej) => {
  console.log(data);
  return (dispatch) => {
    const res = axios
      .post(`${storeurl}api/profile_information`, data, {
        headers: {
          auth: auth,
        },
      })
      .then((res) => {
        if (res.data.status == true) {
          dispatch({
            type: PROFILE_INFO,
            user: res?.data?.data[0],
            token: res?.data?.data[0]?.auth,
            isLoggedIn: true,
          });
          rsl();
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
        rej(err.message);
      });
  };
};

// Search userby filters
export const searchuserbyfilter = (data, auth) => {
  return async (dispatch) => {
    console.log("testingpakistan");
    const res = await axios.post(`${storeurl}api/searchuserbyfilters`, data, {
      headers: {
        auth: auth,
      },
    });
    console.log("helotest", res);
    return res;
  };
};

// Search userby filters
export const get_my_photo_requests = (data, auth) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/get_my_photo_requests`, data, {
      headers: {
        auth: auth,
      },
    });
    return res;
  };
};

export const acept_reject_photo_request = (data, auth) => {
  return async (dispatch) => {
    const res = await axios.post(
      `http://nikahnama.ranaentp.net/api/acept_reject_photo_request`,
      data,
      {
        headers: {
          auth: auth,
        },
      }
    );
    return res;
  };
};
export const Blockuser = (data, auth) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/blockuser`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
    }
    return res;
  };
};

export const getallBlockuser = (data, auth) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/get_blocked_user`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
    }
    return res;
  };
};

export const likeunlikeuser = (data, auth) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/likeunlikeuser`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
    }
    return res;
  };
};

export const getgeneraldata = (data, auth) => {
  return async (dispatch) => {
    const res = await axios.get(`${storeurl}api/get_general_Data`, data, {});
    if (res.data.status) {
    }
    return res;
  };
};

export const getallmyfilters = (data, auth) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/getallmyfilters`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
    }
    return res;
  };
};

export const get_all_users = (data, auth) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/get_all_users`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
    }
    return res;
  };
};

export const get_county = (data, auth) => {
  return async (dispatch) => {
    const res = await axios.get(`${storeurl}api/get_county`, data, {});
    if (res.data.status) {
    }
    return res;
  };
};

//Profile Info
export const updateAdditionalIno = (data, auth, phone) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${storeurl}api/additional_information`,
      data,
      {
        headers: {
          auth: auth,
          phone_no: phone,
        },
      }
    );
    if (res.data.status) {
      dispatch({
        type: PROFILE_INFO,
        user: res?.data?.data[0],
        token: res?.data?.data[0]?.auth,
        isLoggedIn: true,
      });
    }
    return res;
    console.log(res);
    // if (res.data.status) {
    //   dispatch({
    //     type: GET_ARTICLES,
    //     articles: res.data.data,
    //   });
    // } else {
    //   dispatch({
    //     type: GET_ARTICLES,
    //   });
    // }
    return res;
  };
};
export const updatePassword = (data, auth, phone) => {
  return async (dispatch) => {
    const res = await axios(`${storeurl}api/changepassword`, {
      data,
      method: "post",
      headers: {
        auth: auth,
        phone_no: phone,
      },
    });

    return res;
  };
};

/////////////////////// List of rides///////////////////////

export const rideList = (data, rsl, rej) => {
  return async (dispatch) => {
    const res = await axios.get(`${storeurl}api/rideList`, data, {});

    return res;
  };
};

/////////////////////// transactionHistory///////////////////////

export const transactionHistory = (data) => {
  console.log("data api", data);
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}all_transactions`, data, {});

    return res;
  };
};

/////////////////////// postRatting Driver///////////////////////

export const postRatting = (data, auth, name) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}give_rating`, data, {});
    return res;
  };
};

////////////////////////Translation///////////////////////
export const alltranslation = (data) => {
  console.log("mydata123", data);
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}alltranslations`, data);
    console.log("mydata123", data);
    dispatch({
      type: TRANSLATION,
      translation: res.data.data,
      selectedLanguages: data,
    });
    return res;
  };
};
/////////////////////// payment from userbalance///////////////////////

export const paymentfromuserbalance = (data) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}pay_by_userblnc`, data, {});

    return res;
  };
};

////////////////////////update language///////////////////////

export const selectedlanguage = (data, sellang, transl) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}updatelanguage`, data);
    console.log("mydata123 from api123", data, sellang, transl);
    if (res.data.status == true) {
      dispatch({
        type: TRANSLATION,
        translation: transl,
        selectedLanguages: sellang,
      });
      dispatch({
        type: PROFILE_INFO,
        user: res.data.data,
        isLoggedIn: true,
      });
    }
    return res;
  };
};
// ////////////////////////Translation///////////////////////
// export const selectedlanguage = (sellang,transl) => {
//   return async (dispatch) => {
//   console.log('data from selecte languages',sellang,transl)

//   };
// };

////////////////////////Differenr Languages///////////////////////
export const getlanguage = (data) => {
  return async (dispatch) => {
    const res = await axios.get(`${storeurl}languages/${data}`);
    if (res.data.status == true) {
      dispatch({
        type: LOGIN_USER,
        user: res.data.userdata,
        isLoggedIn: true,
      });
    }
    return res;
  };
};
