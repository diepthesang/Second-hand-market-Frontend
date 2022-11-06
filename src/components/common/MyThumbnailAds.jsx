import SimpleImageSlider from "react-simple-image-slider";
import useWindowDimensions from "../../helps/useWindowDimensions";

const images = [
    { url: "https://cdn.tgdd.vn/Files/2017/06/01/988262/sam-combo-phu-kien-cho-de-yeu-voi-chuong-trinh-khuyen-mai-hap-dan-thang-12.jpg" },
    { url: "https://cdn.tgdd.vn/Files/2017/06/01/988262/sam-combo-phu-kien-cho-de-yeu-voi-chuong-trinh-khuyen-mai-hap-dan-thang-12.jpg" },
];



const MyThumbnailAds = () => {
    const { height, width } = useWindowDimensions();

    return (
        <div>
            <div>
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