import axios from "axios";



export const getUserInfo = async () => {
  try {
    const { data } = await axios.get('/admin/user');
    return data.data;
  } catch (error) {
    console.log('error_getUserInfo:::', error);
  }
}

export const removeUser = async (id) => {
  try {
    const { data } = await axios.delete(`/admin/remove/user/${id}`);
    return data.data;
  } catch (error) {
    console.log('error_removeUser:::', error)
  }
}
