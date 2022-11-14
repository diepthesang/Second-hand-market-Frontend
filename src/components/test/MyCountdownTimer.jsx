import { Stack } from "@mui/material";
import axios from "axios";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeOver } from "../../redux/timeOverSice";
import MyModalAuction from "../common/MyModalAuction";

function MyCountdownTimer({ time }) {
  const [expiryTime, setExpiryTime] = React.useState(time);
  const [successfulAuction, setSuccessfulAuction] = useState(false);
  // const _timeOver = useSelector((state) => state.timeOver.timeOver);
  const [countdownTime, setCountdownTime] = React.useState({
    countdownDays: "",
    countdownHours: "",
    countdownMinutes: "",
    countdownSeconds: "",
  });

  const [timeOver, setTimeOver] = useState(false);
  const dispatch = useDispatch();

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      // console.log(countdownDateTime);
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      console.log("hieu thoi gian :::", remainingDayTime);
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      setCountdownTime(runningCountdownTime);

      if (remainingDayTime < 0 && remainingDayTime > -2000) {
        if (localStorage["highest_bid_user"] === localStorage["userId"]) {
          setSuccessfulAuction(true);
        }
        setExpiryTime(false);
        setTimeOver(true);
        console.log("het thoi gian");
        dispatch(getTimeOver(true));
        return;
      }

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setTimeOver(true);
        return;
      }
    }, 1000);
  };

  React.useEffect(() => {
    countdownTimer();
  }, []);

  return (
    <div>
      {timeOver ? (
        <div>
          <p>Thời gian đấu giá kết thúc!</p>
        </div>
      ) : (
        <Stack direction="row">
          <p> {countdownTime.countdownDays} Ngày </p>
          <p> - {countdownTime.countdownHours} Giờ </p>
          <p> - {countdownTime.countdownMinutes} Phút </p>
          <p> - {countdownTime.countdownSeconds} Giây</p>
        </Stack>
      )}
      <MyModalAuction successfulAuction={successfulAuction} />
    </div>
  );
}

export default memo(MyCountdownTimer);
