import { getPosts } from "../API/user_api";

getPosts().then(data => console.log(data));