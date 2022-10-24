import {
    Box,
    Button,
    Checkbox,
    Grid,
    makeStyles,
    MenuItem,
    Snackbar,
    TextField,
    Typography,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import location from "../../helps/location";


const useStyles = makeStyles((theme) => ({
    input_file_cus: {
        // backgroundColor: "#7b35ba",
        borderRadius: 4,
        padding: 8,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px ",
        width: 120,
        height: 120,
        textAlign: 'center',
        // border: 4,
        border: '2px dashed #7b35ba'

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
    const [codeProvince, setCodeProvince] = useState("-1");
    const [codeDistrict, setCodeDistrict] = useState("-1");
    const [countryArr, setCountryArr] = useState([]);
    const [warrantyArr, setWarrantyArr] = useState([]);
    const [categoryParentArr, setCategoryParentArr] = useState([]);
    const [categoryParentId, setCategoryParentId] = useState("-1");
    const [categoryChildArr, setCategoryChildArr] = useState([]);
    const [statusCurrentProduct, setStatusCurrentProduct] = useState([]);
    const [isFreeProduct, setIsFreeProduct] = useState(false);
    const [images, setImages] = useState([]);
    const [imageURLS, setImageURLs] = useState([]);
    const [errMsg, setErrMsg] = useState('')

    // const [cookies, setCookie, removeCookie] = useCookies();
    const classes = useStyles();

    //HANDLE SUBMIT
    const handleSubmit = async (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            cateParentId: data.get("categoryParent"),
            cateId: data.get("categoryChild"),
            name: data.get("productName"),
            statusId: data.get("productState"),
            warrantyId: data.get("warranty"),
            madeInId: data.get("madeIn"),
            description: data.get("describe"),
            price: data.get("price"),
            province: data.get("province"),
            district: data.get("district"),
            ward: data.get("ward"),
            address: data.get("address"),
            free: data.get("freeProduct"),
            image: data.get('file'),
            images: document.querySelector('#file').files,

            // cookie: cookies.get('access_token')
        });


        console.log('images[]::::', images)


        // for (let i = 0; i < images.length; i++) {
        //     images.push(images[i]);
        // }
        // data.append('images', images);

        // console.log('data', data)


        try {
            const res = await axios.post('/user/createPost', {
                cateId: data.get("categoryChild"),
                name: data.get("productName"),
                statusId: data.get("productState"),
                warrantyId: data.get("warranty"),
                madeInId: data.get("madeIn"),
                description: data.get("describe"),
                free: data.get("freeProduct"),
                price: data.get("price"),
                province: data.get("province"),
                district: data.get("district"),
                ward: data.get("ward"),
                address: data.get("address"),
                images: data.get('file'),
                // images: document.querySelector('#file').files[0],
                // images: images,
            },
                {
                    headers: {
                        Authorization: localStorage['access_token'],
                        'Content-type': 'multipart/form-data',
                    }
                }
            )
            setErrMsg('')
            handleClick()
            console.log('ressss:::', res);

        } catch (error) {
            console.log('error::::', error.response.data);
            setErrMsg(error.response.data.message)


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

    const getAllCategoryChild = async () => {
        let { data } = await axios.get(
            `/common/categoryParent/${categoryParentId}/allCategoryChild`
        );
        setCategoryChildArr(data.data);
    };

    const getAllStatusCurrentProduct = async () => {
        let { data } = await axios.get("/common/allStatusCurrentProduct");
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

    useLayoutEffect(() => {
        getDistrictByCodeProvince(codeProvince);
    }, [codeProvince]);

    useLayoutEffect(() => {
        getWardByCodeDistrict(codeDistrict);
    }, [codeDistrict]);

    useLayoutEffect(() => {
        getAllCategoryChild();
    }, [categoryParentId]);

    useLayoutEffect(() => {
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
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div style={{ marginTop: 110 }}>


            <Grid container justifyContent="center">
                <Grid item xs={8}>
                    <div
                        style={{
                            backgroundColor: "#F1ECF5",
                            justifyContent: "center",
                            padding: 20,
                        }}
                    >
                        <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                            <Grid container justifyContent="center">
                                <Grid item xs={6}>
                                    <div style={{ marginTop: 8 }}>
                                        <label htmlFor="file">
                                            <div className={classes.input_file_cus} >
                                                {/* <AddAPhoto style={{ color: 'red' }}></AddAPhoto> */}
                                                <img alt="" style={{ marginTop: 15 }} src="https://img.icons8.com/color/48/000000/camera.png" />
                                                <p style={{ color: "#6f6c70" }}>Add Image</p>
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



                                        <div style={{
                                            marginTop: 16,
                                            display: "flex",
                                            flexWrap: "wrap",
                                            backgroundColor: 'white'
                                        }}
                                        >
                                            {imageURLS.map((imageSrc) => (
                                                <div className={classes.image_frame_cus} >
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
                                                name="categoryParent"
                                                color="black"
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
                                                                setCategoryParentId(item.id);
                                                            }}
                                                            style={{ color: "black" }}
                                                        >
                                                            {item.cateName}
                                                        </div>
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                name="categoryChild"
                                                color="black"
                                                id="standard-size-small"
                                                select
                                                label="Category"
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
                                                name="productName"
                                                label="Product's name"
                                                d="standard-size-small"
                                                size="small"
                                                variant="outlined"
                                            />

                                            <TextField
                                                name="productState"
                                                color="black"
                                                id="filled-select-currency"
                                                select
                                                label="Product'state"
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
                                                name="warranty"
                                                color="black"
                                                id="filled-select-currency"
                                                select
                                                label="Warranty status"
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
                                                name="madeIn"
                                                color="black"
                                                select
                                                label="Made in: "
                                                variant="outlined"
                                                size="small"
                                            >
                                                {countryArr.map((item) => (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        <div style={{ color: "black" }}>
                                                            {item.countryName}
                                                        </div>
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                name="describe"
                                                id="outlined-multiline-static"
                                                label="Describe"
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                            />

                                            <Stack direction="row" alignContent="center">
                                                <Checkbox
                                                    name="freeProduct"
                                                    size="small"
                                                    value={true}
                                                    color="secondary"
                                                    onChange={() => {
                                                        setIsFreeProduct(!isFreeProduct);
                                                    }}
                                                />
                                                <Typography style={{ paddingTop: 8, color: "black" }}>
                                                    Products for free giveaways{" "}
                                                </Typography>
                                            </Stack>

                                            <TextField
                                                name="price"
                                                disabled={isFreeProduct}
                                                label="Price *"
                                                d="standard-size-small"
                                                size="small"
                                                variant="outlined"
                                            />

                                            {/* TINH  */}

                                            <TextField
                                                name="province"
                                                color="black"
                                                select
                                                label="Pronvince"
                                                size="small"
                                                variant="outlined"
                                            >
                                                {location.province.map((item) => (
                                                    <MenuItem key={item.name} value={item.name}>
                                                        <div
                                                            onClick={() => {
                                                                setCodeProvince(item.code);
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
                                                name="district"
                                                color="black"
                                                id="filled-select-currency"
                                                select
                                                label="District"
                                                size="small"
                                                variant="outlined"
                                            >
                                                {districtData.map((item) => (
                                                    <MenuItem key={item.name} value={item.name}>
                                                        <div
                                                            onClick={() => {
                                                                setCodeDistrict(item.code);
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
                                                name="ward"
                                                color="black"
                                                select
                                                label="ward"
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
                                                label="Address"
                                                d="standard-size-small"
                                                size="small"
                                                variant="outlined"
                                            />
                                            {errMsg && <Alert variant="filled" severity="error">
                                                {errMsg}
                                            </Alert>}
                                            <Button
                                                type="submit"
                                                style={{ backgroundColor: "#7b35ba" }}
                                                onClick={() => { }}
                                            >
                                                Submit
                                            </Button>
                                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                                <Alert style={{ backgroundColor: '#08DB3C' }} onClose={handleClose} severity="success" sx={{ width: '100%' }}>
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
        </div >
    );
}

export default MyBodyPost;
