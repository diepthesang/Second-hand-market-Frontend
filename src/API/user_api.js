import axios from "axios";



export const getUsers = async () => {
  try {
    const { data } = await axios.get('/admin/user');
    console.log('listUsr:::', data.data)
    return data.data;
  } catch (error) {
    console.log('error_getUserInfo:::', error);
  }
}

export const removeUser = async (id) => {
  try {
    const { data } = await axios.delete(`/admin/user/remove/userId/${id}`);
    return data.data;
  } catch (error) {
    console.log('error_removeUser:::', error)
  }
}

export const getRevenueByUser = async (isWithdrew) => {
  try {
    const { data } = await axios.get(`/user/revenue/isWithdrew/${isWithdrew}`,
      {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
    console.log('listRevenue::', data.data);
    return data.data;
  } catch (error) {
    console.log('err_getRevenueByUser:::', error);
  }
}

export const withdrawByUser = async (isWithdrew) => {
  try {
    const { data } = await axios.put('/user/revenue',
      {
        isWithdrew
      },
      {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
    return !!data.data;
  } catch (error) {
    console.log('err_withdrawByUser:::', error);
  }
}

export const searchUserByLastname = async (lastName) => {
  try {
    const { data } = await axios.get(`/admin/user/search/lastName/${lastName}`);
    console.log('searchUser::::;', data.data);
    return data.data
  } catch (error) {
    console.log('err_searchUserByLastname', error);
  }
}

export const getPosts = async () => {
  try {
    const { data } = await axios.get('/admin/post');
    console.log('getPosts:::', data.data);
    return data.data;
  } catch (error) {
    console.log('err_getPosts', error);
  }
}

export const removePostByPostId = async (id) => {
  try {
    const { data } = await axios.delete(`/admin/post/remove/postId/${id}`);
    console.log('removePostByPostId::', data.data);
    return data.data;
  } catch (error) {
    console.log('err_removePostByPostId:::', error);
  }
}

export const searchPostByTitle = async (title) => {
  try {
    const { data } = await axios.get(`/admin/post/search/title/${title}`);
    return data.data;
  } catch (error) {
    console.log('err_searchPostByTitle:::', error);
  }
}