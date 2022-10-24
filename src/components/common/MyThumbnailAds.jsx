import { Container, Grid, ListItem, makeStyles } from "@material-ui/core";
import { Box } from "@mui/system";
import { useEffect, useLayoutEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import useWindowDimensions from "../../helps/useWindowDimensions";
// import useWindowDimensions from "../Helps/useWindowDimensions";

const images = [
    { url: "https://storage.googleapis.com/happy-quiz-vn.appspot.com/zq/quizzes/55f688ba349585030071e7ff-09a86970-5ac4-11e5-9a2b-050901070303-compressed.jpg" },
    { url: "https://i.ytimg.com/vi/WYW1h3M5CyI/maxresdefault.jpg" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeHMReDb5GX4ro__8uwO7sI2c8fujzZ6gsVJTskjwFcG5CP-ezSAJI4ZTn1arU5W5agY4&usqp=CAU" },
];


const useStyles = makeStyles((theme) => ({
    border__thumbnail: {
        borderRadius: 25,
        paddingTop: 24,
        paddingLeft: 10,
        marginTop: 20,
        justifyContent: 'center'
    }

}));
const MyThumbnailAds = () => {
    const { height, width } = useWindowDimensions();
    const classes = useStyles();

    return (
        <div>
            <div className={classes.border__thumbnail}>
                <div style={{ justifyContent: "center" }}>
                    <SimpleImageSlider autoPlay='true'
                        width={width * 8 / 12 - 30}
                        height={height * 2 / 5}
                        images={images}
                        showBullets={false}
                        showNavs={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyThumbnailAds