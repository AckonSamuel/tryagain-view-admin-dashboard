import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";

// create
import categoryCreateSlice from "./slices/categories/addCategorySlice";
import categoryFetchSlice from "./slices/categories/fetchCategorySlice";
import labCreateSlice from "./slices/labs/addLabSlice";
import labFetchSlice from "./slices/labs/fetchLabSlice";
import instrumentCreateSlice from "./slices/instruments/instrumentCreate";
import instrumentFetchSlice from "./slices/instruments/instrumentFetch";
import categoryDeleteSlice from "./slices/categories/deleteCategories";
import labDeleteSlice from "./slices/labs/deleteLabs";
import instrumentDeleteSlice from "./slices/instruments/instrumentDelete";

// admin
import getAdminSlice from "./slices/admin/getAdminSlice";
import adminLoginSlice from "./slices/admin/loginSlice";
import adminRegisterSlice from "./slices/admin/registerSlice";
import adminLogoutSlice from "./slices/admin/logoutSlice";

// upload-instrument-image
import postUploadSlice from "./slices/posts/postUpload";

// update
import instrumentUpdateSlice from "./slices/instruments/instrumentUpdate";

const MyMiddlewares = [logger, thunk];

const store = configureStore({
  reducer: {
    // create
    categoryCreate: categoryCreateSlice.reducer,
    labCreate: labCreateSlice,
    instrumentCreate: instrumentCreateSlice.reducer,

    // fetch
    categoryFetch: categoryFetchSlice.reducer,
    labFetch: labFetchSlice.reducer,
    instrumentFetch: instrumentFetchSlice,

    // delete
    categoryDelete: categoryDeleteSlice.reducer,
    labDelete: labDeleteSlice.reducer,
    instrumentDelete: instrumentDeleteSlice.reducer,

    // update
    postUpload: postUploadSlice.reducer,
    instrumentUpdate: instrumentUpdateSlice.reducer,
    
    // admin
    getAdmin: getAdminSlice.reducer,
    adminLogin: adminLoginSlice.reducer,
    adminLogout: adminLogoutSlice.reducer,
    adminRegister: adminRegisterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "student/studentLogout/fulfilled",
          "staff/staffLogout/fulfilled",
          "club/clubLogout/fulfilled",
          "club/clubUpdate/fulfilled",
          "post/postUpload/fulfilled",
          "post/postFetch/fulfilled",
          "category/categoryCreate/fulfilled",
        ],
      },
    }).concat(MyMiddlewares),
});

export default store;
