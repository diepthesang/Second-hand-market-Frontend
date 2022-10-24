import { configureStore } from "@reduxjs/toolkit";
import categoryChildIdReducer from './categorySlice'
import postIdReducer from './postSlice'
import likePostReducer from './likePostSlice'




export default configureStore(
  {
    reducer: {
      postId: postIdReducer,
      categoryChildId: categoryChildIdReducer,
      likePost: likePostReducer,

    }
  }
)




// import { configureStore } from "@reduxjs/toolkit"
// import productReducer from './productSlice'
// import categoryReducer from './categorySlice'
// import searchReducer from './searchSlice'
// import cartReducer from './cartSlice'
// import { postSlice, postIdSlice } from './postSlice';
// export default configureStore({
//   reducer: {

//     product: productReducer,
//     category: categoryReducer,
//     search: searchReducer,
//     cart: cartReducer

//   }
// })