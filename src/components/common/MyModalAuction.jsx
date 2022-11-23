import { Box, Button, Modal, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeOver } from "../../redux/timeOverSice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MyModalAuction() {
  const successfulAuction = useSelector(
    (state) => state.successfulAuction.successfulAuction
  );
  console.log("thanh cong or that bai", successfulAuction);
  const dispatch = useDispatch();
  const _timeOver = useSelector((state) => state.timeOver.timeOver);
  // const [open, setOpen] = useState(true);

  // const handleOpen = () => setOpen(true);

  const handleClose = () => {
    dispatch(getTimeOver(false));
  };
  return (
    <div>
      {successfulAuction ? (
        <Modal
          open={_timeOver}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Thời gian đấu giá kết thúc!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Chúc mừng bạn đã đấu giá thành công sản phẩm,
              mới bạn đến giỏ hàng để thanh toán.
            </Typography>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={_timeOver}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Thời gian đấu giá kết thúc!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Đấu giá thất bại!
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default MyModalAuction;