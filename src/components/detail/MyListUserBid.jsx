import { Paper } from "@material-ui/core";
import { Stack } from "@mui/system";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

function MyListUserBid({ listUserBid}) {
  console.log("listUserBId:::", listUserBid);
  // console.log({ postId, postAuctionId });
  // const { listUserBid, setListUserBid } = useState([]);

  // // get list user bid
  // const getListUserBid = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `/common/listBidPrice/postId/${postId}/postAuctionId/${postAuctionId}`
  //     );
  //     console.log("list user bid ::::", data.data);
  //     setListUserBid(data.data);
  //   } catch (error) {
  //     console.log("error_getListPostUserBid:::", error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("useEffect <><><><><><><><><><");
  //   getListUserBid();
  // }, []);

  // useEffect(() => {
  //   socket.on("userBid", (bid) => {
  //     console.log("biddddddd*******", bid);
  //     // setBid(bid);
  //   });
  //   return () => {
  //     socket.off("userBid");
  //   };
  // }, []);

  return (
    <Stack spacing={2}>
      <Stack direction="column" spacing={1}>
        {listUserBid.map((item) => {
          return (
            <Paper
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: 4,
                justifyContent: "space-between",
              }}
            >
              <img
                src={item.User.avatarImg}
                alt=""
                width={30}
                height={30}
                style={{ borderRadius: "50%" }}
              />
              <p style={{ marginLeft: 16 }}>{item.priceBid} đ</p>
              <ClearIcon style={{ fill: "white" }}></ClearIcon>
            </Paper>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default MyListUserBid;
