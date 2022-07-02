import axios from "axios";
import auth from "@react-native-firebase/auth";
import React from "react";
import { storeurl } from "../actions/storeurl";
import {
  FAQs,
  GET_ARTICLES,
  GET_USERS,
  GET_ALL_PHOTOS,
  LOGIN_USER,
} from "../actions/types";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { CommonActions } from "@react-navigation/routers";
import AlertModal from "../../components/AlertModal";
import { Alert } from "react-native";
//Faqs
export const getFaqs = (rsl, rej, navigation) => {
  return async (dispatch) => {
    await axios(`${storeurl}api/get_faqs`, { method: "get" })
      .then((res) => {
        if (res.data.status == true) {
          dispatch({
            type: FAQs,
            data: res.data.data,
          });
        } else if (res.data.status == false) {
          dispatch({
            type: FAQs,
          });
        } else if (res.data.status == "ban") {
          dispatch({
            type: LOGIN_USER,
            user: null,
            token: "",
            isLoggedIn: false,
          });

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        }
        rej();
      })
      .catch((err) => {
        rej();
      });
  };
};

//Articles
export const getArticles = (data, auth, navigation) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/get_articles`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
      // dispatch({
      //   type: GET_ARTICLES,
      //   articles: res.data.data,
      // });
      return res;
    } else if (res.data.status == "ban") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } else {
      dispatch({
        type: GET_ARTICLES,
      });
      return res;
    }
  };
};

//users
export const usersList = (id, navigation) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/get_all_users`);
    const users = res?.data?.data?.filter((i) => {
      return i.id != id;
    });
    if (res.data.status) {
      dispatch({
        type: GET_USERS,
        users: users,
      });
      return res;
    } else if (res.data.status == "ban") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } else {
      dispatch({
        type: GET_USERS,
      });
      return res;
    }
  };
};
//singleUser
export const singleUser = (data, navigation) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/user_details`, data);

    if (res.data.status == "ban") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } else {
      return res;
    }
  };
};
//singleUser
export const uploadPhoto = (data, auth, navigation) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `http://nikahnama.ranaentp.net/api/uploadImages`,
        data,
        {
          headers: {
            auth: auth,
          },
        }
      );

      if (res.data.status) {
        const publicPhotos = res?.data?.data?.filter((i) => {
          return i.photo_status == 0;
        });
        const privatePhotos = res?.data?.data?.filter((i) => {
          return i.photo_status == 1;
        });
        const coverPhoto = res?.data?.data?.filter((i) => {
          return i.photo_status == -2;
        });
        dispatch({
          type: GET_ALL_PHOTOS,
          publicPhotos: [...publicPhotos, ""],
          privatePhotos: [...privatePhotos, ""],
          coverPhoto: coverPhoto,
        });
        return res;
      } else if (res.data.status == "ban") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      } else {
        dispatch({
          type: GET_ALL_PHOTOS,
          publicPhotos: [""],
          privatePhotos: [""],
          coverPhoto: "",
        });
        return res;
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const uploadcoverPhoto = (data, auth, navigation) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `http://nikahnama.ranaentp.net/api/uploadImages`,
        data,
        {
          headers: {
            auth: auth,
          },
        }
      );

      if (res.data.status) {
        dispatch({
          type: LOGIN_USER,
          user: res.data.data[0],
          token: res.data.data[0].auth,
          isLoggedIn: true,
        });

        return res;
      } else if (res.data.status == "ban") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      } else {
      }
    } catch (err) {}
  };
};

export const uploaddp = (data, auth, navigation) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `http://nikahnama.ranaentp.net/api/uploadImages`,
        data,
        {
          headers: {
            auth: auth,
          },
        }
      );

      if (res.data.status == true) {
        dispatch({
          type: LOGIN_USER,
          user: res.data.data[0],
          token: res.data.data[0].auth,
          isLoggedIn: true,
        });

        return res;
      } else if (res.data.status == "ban") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      } else {
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const movepublicimagetoasdp = (data, auth, navigation) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${storeurl}api/movepublicimagetoasdp`,
        data,
        {
          headers: {
            auth: auth,
          },
        }
      );

      if (res.data.status == true) {
        dispatch({
          type: LOGIN_USER,
          user: res.data.data[0],
          token: res.data.data[0].auth,
          isLoggedIn: true,
        });

        return res;
      } else if (res.data.status == "ban") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      } else {
      }
    } catch (err) {}
  };
};

//users
export const searchUser = (data, navigation) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/search_user`, data);
    console.log(res);
    if (res.data.status == "ban") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } else {
      return res.data.data;
    }
  };
};
//status
export const updatePhotoStatus = (data, auth, phone, navigation) => {
  return async (dispatch) => {
    const res = await axios.post(`${storeurl}api/update_photo_status`, data, {
      headers: { auth: auth, phone_no: phone },
    });

    if (res.data.status) {
      const publicPhotos = res?.data?.data?.filter((i) => {
        return i.photo_status == 0;
      });
      const privatePhotos = res?.data?.data?.filter((i) => {
        return i.photo_status == 1;
      });

      dispatch({
        type: GET_ALL_PHOTOS,
        publicPhotos: [...publicPhotos, ""],
        privatePhotos: [...privatePhotos, ""],
      });
      return res;
    } else if (res.data.status == "ban") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } else {
      dispatch({
        type: GET_ALL_PHOTOS,
        publicPhotos: [""],
        privatePhotos: [""],
      });
      return res;
    }
    // return res.data.data;
  };
};
//users
export const getPhotos = (auth, phone, navigation) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${storeurl}api/user_photos`, null, {
        headers: {
          auth: auth,
        },
      });
      if (res.data.status == true) {
        const publicPhotos = res?.data?.data?.filter((i) => {
          return i.photo_status == 0;
        });
        const privatePhotos = res?.data?.data?.filter((i) => {
          return i.photo_status == 1;
        });

        dispatch({
          type: GET_ALL_PHOTOS,
          publicPhotos: [...publicPhotos, ""],
          privatePhotos: [...privatePhotos, ""],
        });
        return res;
      } else if (res.data.status == "ban") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      } else if (res.data.status == "false") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      } else {
        dispatch({
          type: GET_ALL_PHOTOS,
          publicPhotos: [""],
          privatePhotos: [""],
        });
        return res;
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_PHOTOS,
        publicPhotos: [""],
        privatePhotos: [""],
      });
    }
  };
};
//payment
export const transaction = (data, auth, navigation) => {
  return async (dispatch) => {
    const res = await axios.post(
      `http://nikahnama.ranaentp.net/api/paymentApi`,
      data,
      {
        headers: { auth: auth },
      }
    );
    if (res.data.status == "ban") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } else {
      return res;
    }

    // return res.data.data;
  };
};
