import React from "react";
import { Admin, Resource } from "react-admin";
import { listPosts } from "./MyPost";

function MyAdminPage() {
  return (
    <div>
      <Admin dataProvider={'http://localhost:8080/common/allPost'}>
        <Resource name="posts" list={listPosts} />
      </Admin>
    </div>
  );
}

export default MyAdminPage;



// const getListPosts = async axios.get('/')
