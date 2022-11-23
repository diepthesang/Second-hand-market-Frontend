import {
  Button,
  Checkbox,
  Grid,
  makeStyles,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import location from "../../helps/location";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const useStyles = makeStyles((theme) => ({
  input_file_cus: {
    // backgroundColor: "#7b35ba",
    borderRadius: 4,
    padding: 8,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px ",
    width: 120,
    height: 120,
    textAlign: "center",
    // border: 4,
    border: "2px dashed #7b35ba",
  },

  image_frame_cus: {
    margin: 8,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px ",
  },
}));

function MyBodyPost() {
  // const { height, width } = useWindowDimensions();
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [countryArr, setCountryArr] = useState([]);
  const [warrantyArr, setWarrantyArr] = useState([]);
  const [categoryParentArr, setCategoryParentArr] = useState([]);
  const [categoryChildArr, setCategoryChildArr] = useState([]);
  const [statusCurrentProduct, setStatusCurrentProduct] = useState([]);
  const [isFreeProduct, setIsFreeProduct] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [isBidProduct, setIsBidProduct] = useState(false);

  const navigate = useNavigate();

  // const [cookies, setCookie, removeCookie] = useCookies();
  const classes = useStyles();

  //HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const data = new FormData(form);

    // console.log({
    //     cateParentId: data.get("categoryParent"),
    //     cateId: data.get("categoryChild"),
    //     name: data.get("productName"),
    //     statusId: data.get("productState"),
    //     warrantyId: data.get("warranty"),
    //     madeInId: data.get("madeIn"),
    //     description: data.get("describe"),
    //     price: data.get("price") || null,
    //     province: data.get("province"),
    //     district: data.get("district"),
    //     ward: data.get("ward"),
    //     address: data.get("address"),
    //     free: data.get("freeProduct"),
    //     bidOption: data.get("bidOption"),

    //     // images: data.get('file'),
    //     // images: document.querySelector('#file').files,
    //     // images: data.get('file')

    // });

    data.append("cateParentId", data.get("categoryParent"));
    data.append("cateId", data.get("cateId"));
    data.append("name", data.get("name"));
    data.append("statusId", data.get("statusId"));
    data.append("warrantyId", data.get("warrantyId"));
    data.append("madeInId", data.get("madeInId"));
    data.append("description", data.get("description"));
    data.append("price", data.get("price") || -1);
    data.append("district", data.get("district"));
    data.append("ward", data.get("ward"));
    data.append("address", data.get("address"));
    data.append("free", data.get("free"));
    data.append("bidOption", data.get("bidOption"));
    data.append("startPrice", data.get("startPrice"));

    images.forEach(async (file) => {
      data.append("images", file);
    });

    for (const value of data.values()) {
      console.log(value);
    }

    console.log("formData:::", data.keys());

    const _data = {
      // cateParentId: data.get("categoryParent"),
      cateId: data.get("cateId"),
      name: data.get("name"),
      statusId: data.get("statusId"),
      warrantyId: data.get("warrantyId"),
      madeInId: data.get("madeInId"),
      description: data.get("description"),
      free: data.get("free"),
      price: data.get("price"),
      province: data.get("province"),
      district: data.get("district"),
      ward: data.get("ward"),
      address: data.get("address"),
      bidOption: data.get("bidOption"),
      startPrice: data.get("startPrice"),
      bidEndTime: timer,
      images: document.querySelector("#file").files[0],
      // images: images,
    };

    console.log("listImage1::::", document.querySelector("#file").files);
    console.log("listImage2:::", images);

    // let listImage = [];
    // const objImage = document.querySelector('#file').files;

    // for (const key in objImage) {
    //     if (objImage.hasOwnProperty(key)) {
    //         var value = objImage[key];
    //         //do something with value;
    //         data.append('images', value);
    //     }
    // }

    // console.log('data::::', data);

    // console.log('dataa:::', _data);

    try {
      const res = await axios.post(
        "/user/createPost",
        { ..._data },
        {
          headers: {
            Authorization: localStorage["access_token"],
            "Content-type": `multipart/form-data`,
          },
          // transformRequest: (data) => {
          //     return data; // thats enough
          // },
        }
      );
      setErrMsg("");
      handleClick();
      console.log("ressss:::", res.data.data.id);
      // navigate(`/post/${res.data.data.id}`);
    } catch (error) {
      console.log("error::::", error.response.data);
      setErrMsg(error.response.data.message);
    }
  };

  const getDistrictByCodeProvince = (codeProvince) => {
    const districtData = location.district.filter((item) => {
      return item.parentCode === codeProvince;
    });
    setDistrictData(districtData);
  };

  const getWardByCodeDistrict = (codeDistrict) => {
    const wardData = location.ward.filter((item) => {
      return item.parentCode === codeDistrict;
    });
    setWardData(wardData);
  };

  const getAllCountry = async () => {
    let { data } = await axios.get("/common/allCountryName");
    setCountryArr(data.data);
  };

  const getAllWarrantyStatus = async () => {
    let { data } = await axios.get("/common/warrantyStatus");
    setWarrantyArr(data.data);
  };

  const getAllCategoryParrent = async () => {
    let { data } = await axios.get("/common/allCategoryParent");
    setCategoryParentArr(data.data);
  };

  const getAllCategoryChild = async (categoryParentId) => {
    let { data } = await axios.get(
      `/common/categoryParent/${categoryParentId}/allCategoryChild`
    );
    setCategoryChildArr(data.data);
    console.log("cateChild:::", data.data);
  };

  const getAllStatusCurrentProduct = async () => {
    let { data } = await axios.get("/common/allStatusCurrentProduct");
    console.log("PostCondition::::", data);
    setStatusCurrentProduct(data.data);
  };

  //CHANGE IMAGE

  const onImageChange = async (event) => {
    setImages([...event.currentTarget.files]);
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  useEffect(() => {
    getAllCountry();
    getAllWarrantyStatus();
    getAllCategoryParrent();
    getAllStatusCurrentProduct();
  }, []);

  // show message cussess
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //  timeover for auction

  const [timer, setTimer] = React.useState(Date.now());

  const handleChangeTimer = (timer) => {
    // const _timer = new Date(timer).getTime();
    console.log("timer:::", timer.$d);
    setTimer(timer.$d + "");
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <div
            style={{
              backgroundColor: "#F1ECF5",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <form
              method="post"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <Grid container justifyContent="center">
                <Grid item xs={6}>
                  <div style={{ marginTop: 8 }}>
                    <label htmlFor="file">
                      <div className={classes.input_file_cus}>
                        {/* <AddAPhoto style={{ color: 'red' }}></AddAPhoto> */}
                        <img
                          alt=""
                          style={{ marginTop: 15 }}
                          src="https://img.icons8.com/color/48/000000/camera.png"
                        />
                        <p style={{ color: "#6f6c70", fontSize: 14 }}>
                          Thêm hình ảnh
                        </p>
                      </div>
                    </label>
                    <input
                      name="file"
                      accept="image/*"
                      type="file"
                      id="file"
                      hidden
                      multiple
                      onChange={onImageChange}
                    ></input>

                    <div
                      style={{
                        marginTop: 16,
                        display: "flex",
                        flexWrap: "wrap",
                        backgroundColor: "white",
                      }}
                    >
                      {imageURLS.map((imageSrc) => (
                        <div key={imageSrc} className={classes.image_frame_cus}>
                          <img
                            src={imageSrc}
                            alt="not fount"
                            width={120}
                            height={120}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ marginLeft: 40 }}>
                    <Stack spacing={1} justifyContent="center">
                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="cateParentId"
                        id="standard-size-small"
                        select
                        label="Category"
                        size="small"
                        variant="outlined"
                      >
                        {categoryParentArr.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <div
                              onClick={() => {
                                // setCategoryParentId(item.id);
                                getAllCategoryChild(item.id);
                              }}
                              style={{ color: "black" }}
                            >
                              {item.cateName}
                            </div>
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="cateId"
                        id="standard-size-small"
                        select
                        label="Category Child"
                        size="small"
                        variant="outlined"
                      >
                        {categoryChildArr.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <div style={{ color: "black" }}>
                              {item.cateName}
                            </div>
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="name"
                        label="Tên sản phẩm"
                        d="standard-size-small"
                        size="small"
                        variant="outlined"
                      />

                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="statusId"
                        id="filled-select-currency"
                        select
                        label="Trạng thái sản phẩm"
                        size="small"
                        variant="outlined"
                      >
                        {statusCurrentProduct.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <div style={{ color: "black" }}>{item.status}</div>
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="warrantyId"
                        id="filled-select-currency"
                        select
                        label="Bảo hành"
                        size="small"
                        variant="outlined"
                      >
                        {warrantyArr.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <div style={{ color: "black" }}>{item.status}</div>
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="madeInId"
                        select
                        label="Sản xuất tại"
                        variant="outlined"
                        size="small"
                      >
                        {countryArr.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <div style={{ color: "black" }}>
                              {item.countryName}
                            </div>
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        name="description"
                        id="outlined-multiline-static"
                        label="Mô tả"
                        multiline
                        minRows={4}
                        variant="outlined"
                      />

                      <Stack direction="row" alignContent="center">
                        <Checkbox
                          style={{
                            color: "#7b35ba",
                          }}
                          name="free"
                          size="small"
                          value={true}
                          color="secondary"
                          onChange={() => {
                            setIsFreeProduct(!isFreeProduct);
                          }}
                        />
                        <Typography style={{ paddingTop: 8, color: "black" }}>
                          Sản phẩm dùng để cho tặng{" "}
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignContent="center">
                        <Checkbox
                          style={{
                            color: "#7b35ba",
                          }}
                          name="bidOption"
                          size="small"
                          value={true}
                          color="secondary"
                          onChange={() => {
                            setIsBidProduct(!isBidProduct);
                          }}
                        />
                        <Typography style={{ paddingTop: 8, color: "black" }}>
                          Đấu giá{" "}
                        </Typography>
                      </Stack>

                      {/* timeover */}

                      {isBidProduct ? (
                        <>
                          <div style={{ justifyContent: "center" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                label="Thời gian kết thúc đấu giá"
                                value={timer}
                                onChange={handleChangeTimer}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </div>
                          <TextField
                            name="startPrice"
                            disabled={!isBidProduct}
                            label="Giá khởi điểm *"
                            d="standard-size-small"
                            size="small"
                            variant="outlined"
                          />
                        </>
                      ) : (
                        <TextField
                          name="price"
                          disabled={isFreeProduct}
                          label="Price *"
                          d="standard-size-small"
                          size="small"
                          variant="outlined"
                        />
                      )}

                      {/* TINH  */}

                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="province"
                        select
                        label="Tỉnh/Thành phố"
                        size="small"
                        variant="outlined"
                      >
                        {location.province.map((item) => (
                          <MenuItem key={item.name} value={item.name}>
                            <div
                              onClick={() => {
                                getDistrictByCodeProvince(item.code);
                              }}
                              style={{ color: "black" }}
                            >
                              {item.name}
                            </div>
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* HUYEN */}

                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="district"
                        id="filled-select-currency"
                        select
                        label="Huyện/Quận"
                        size="small"
                        variant="outlined"
                      >
                        {districtData.map((item) => (
                          <MenuItem key={item.name} value={item.name}>
                            <div
                              onClick={() => {
                                getWardByCodeDistrict(item.code);
                              }}
                              style={{ color: "black" }}
                            >
                              {item.name}
                            </div>
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* XA */}

                      <TextField
                        SelectProps={{ MenuProps: { disableScrollLock: true } }}
                        name="ward"
                        select
                        label="Xã/Phường"
                        size="small"
                        variant="outlined"
                      >
                        {wardData.map((item) => (
                          <MenuItem key={item.name} value={item.name}>
                            <div style={{ color: "black" }}>{item.name}</div>
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        name="address"
                        label="Đường"
                        d="standard-size-small"
                        size="small"
                        variant="outlined"
                      />
                      {errMsg && (
                        <Alert variant="filled" severity="error">
                          {errMsg}
                        </Alert>
                      )}
                      <Button
                        type="submit"
                        style={{ backgroundColor: "#7b35ba" }}
                        onClick={() => {}}
                      >
                        <p style={{ color: "white" }}>Tạo bài viết</p>
                      </Button>
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                      >
                        <Alert
                          style={{ backgroundColor: "#08DB3C" }}
                          onClose={handleClose}
                          severity="success"
                          sx={{ width: "100%" }}
                        >
                          Tạo bài viết thành công
                        </Alert>
                      </Snackbar>
                    </Stack>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyBodyPost;
