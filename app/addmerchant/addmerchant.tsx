"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useSpring, animated } from "@react-spring/web";
import { FormControl, Grid, Input, TextField } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingPage from "../components/loadingpage/loadingpage";
import { zfd } from "zod-form-data";
import { addMerchant, getallmerchants } from "../Service/Api";
import { setMerchantData } from "@/redux/features/merchantdata-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const FormSchema = z.object({
  userName: z.string().nonempty("Username is required"),
  email: z
    .string()
    .nonempty("Professional email is required")
    .email("Invalid email"),
  password: z.string().nonempty("Password is required"),
  mobile: z.string().nonempty("Mobile number is required").min(10),
  merchantName: z.string().nonempty("this field can't be empty"),
  gst: z.string().nonempty("this field can't be empty"),
});

type FormInput = z.infer<typeof FormSchema>;

export default function AddMerchant(token: any) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let loading = false;

  const onSubmit = async (data: FormInput) => {
    const Data = zfd.formData(FormSchema).parse(data);

    const businessDetail = {
      merchant_name: Data.merchantName,
      gst: Data.gst,
    };
    const formData = {
      user_name: Data.userName,
      email: Data.email,
      mobile: Data.mobile,
      password: Data.password,
      business_detail: businessDetail,
    };
    loading = true;
    let result1 = await addMerchant(formData, token.token);
    if (
      result1 != undefined &&
      result1.toString() ===
        "Merchant registered successfully with basic details"
    ) {
      const result2 = await getallmerchants(token.token);
      dispatch(setMerchantData(result2));
      reset();
      handleClose();
      alert("Suceessfully registered");
    } else {
      alert("there was an error");
    }
    loading = false;
  };

  const handleReset = () => {
    reset(); // Reset the form fields
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Merchant
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
        sx={{
          overflow: "scroll",
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              height: "100",
              p: 4,
              width: "80%",
            }}
            id="spring-modal-description"
          >
            {loading ? (
              <LoadingPage />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Add Merchant Form
                </Grid>
                <br /> <br />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="userName"
                        label="Username"
                        error={!!errors.userName}
                        helperText={errors.userName?.message}
                        {...register("userName")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="email"
                        label="Email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register("email")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="password"
                        label="Password"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register("password")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="mobile"
                        label="Mobile Number"
                        error={!!errors.mobile}
                        helperText={errors.mobile?.message}
                        {...register("mobile")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="merchantName"
                        label="Merchant Name"
                        error={!!errors.merchantName}
                        helperText={errors.merchantName?.message}
                        {...register("merchantName")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="gst"
                        label="GST"
                        error={!!errors.gst}
                        helperText={errors.gst?.message}
                        {...register("gst")}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <br />
                <Grid
                  container
                  spacing={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                ></Grid>
                <br /> <br />
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
                    color="error"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Grid>
              </form>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
