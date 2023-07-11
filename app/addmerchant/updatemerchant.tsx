"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useSpring, animated } from "@react-spring/web";
import { Chip, FormControl, Grid, Input, Link, TextField } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingPage from "../components/loadingpage/loadingpage";
import { zfd } from "zod-form-data";
import { updateMerchantbyid } from "../Service/Api";
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
  businessName: z.string(),
  businessType: z.string(),
  businessCategory: z.string(),
  businessSubCategory: z.string(),
  address: z.string(),
  pincode: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  companyExpenditure: z.union([
    z.string().transform((val) => parseInt(val.trim())),
    z.number(),
  ]),
  website: z.string(),
  bankName: z.string(),
  bankAccountNumber: z.string(),
  bankIFSCCode: z.string(),
  gst: z.string().nonempty("this field can't be empty"),
  panNumber: z.string(),
  aadharNumber: z.string(),
  companyPANCard: z.union([z.custom<File>(), z.string()]).nullable(),
  companyGSTCertificate: z.union([z.custom<File>(), z.string()]).nullable(),
  bankStatement: z.union([z.custom<File>(), z.string()]).nullable(),
  amount: z.any(),
  transactionLimit: z.any(),
});

type FormInput = z.infer<typeof FormSchema>;

export default function UpdateMerchant(props: { rowdata: any; varToken: any }) {
  function handleFiles(files: any) {
    // console.log(files);
    if (files instanceof FileList) {
      if (files.item(0) != null) {
        var file: File = files.item(0)!;
        // console.log(file);
        return file;
      }
    } else {
      return files;
    }
  }
  const defaultValues: FormInput = {
    email: props.rowdata.email,
    mobile: props.rowdata.mobile,
    address: props.rowdata.business_address.address,
    userName: props.rowdata.user_name,
    password: props.rowdata.password,
    merchantName: props.rowdata.business_detail.merchant_name,
    businessName: props.rowdata.business_detail.business_name,
    businessType: props.rowdata.business_detail.business_type,
    businessCategory: props.rowdata.business_detail.business_category,
    businessSubCategory: props.rowdata.business_detail.business_sub_category,
    pincode: props.rowdata.business_address.pincode,
    city: props.rowdata.business_address.city,
    state: props.rowdata.business_address.state,
    country: props.rowdata.business_address.country,
    companyExpenditure: props.rowdata.business_detail.company_expenditure,
    website: props.rowdata.business_detail.website,
    bankName: props.rowdata.business_detail.bank_name,
    bankAccountNumber: props.rowdata.business_detail.bank_account_number,
    bankIFSCCode: props.rowdata.business_detail.bank_ifsc_code,
    gst: props.rowdata.business_detail.gst,
    panNumber: props.rowdata.business_detail.pan_number,
    aadharNumber: props.rowdata.business_detail.aadhar_number,
    companyPANCard: props.rowdata.kyc_documents.company_pan_card,
    companyGSTCertificate: props.rowdata.kyc_documents.company_gst,
    bankStatement: props.rowdata.kyc_documents.bank_statement,
    amount: props.rowdata.amount,
    transactionLimit: props.rowdata.transaction_limit,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setloading] = React.useState(false);

  const onSubmit = async (data: FormInput) => {
    const Data = zfd.formData(FormSchema).parse(data);
    const businessDetail = {
      // merchant_name: Data.merchantName,
      business_name: Data.businessName,
      business_type: Data.businessType,
      business_category: Data.businessCategory,
      business_sub_category: Data.businessSubCategory,
      company_expenditure: Data.companyExpenditure,
      website: Data.website,
      bank_name: Data.bankName,
      bank_account_number: Data.bankAccountNumber,
      bank_ifsc_code: Data.bankIFSCCode,
      // gst: Data.gst,
      pan_number: Data.panNumber,
      aadhar_number: Data.aadharNumber,
    };
    const businessAddress = {
      address: Data.address,
      pincode: Data.pincode,
      city: Data.city,
      state: Data.state,
      country: Data.country,
    };

    const formData = {
      // user_name: Data.userName,
      // email: Data.email,
      // mobile: Data.mobile,
      // password: Data.password,
      transaction_limit: parseInt(Data.transactionLimit.trim()),
      amount: parseInt(Data.amount.trim()),
      business_detail: businessDetail,
      business_address: businessAddress,
      companyPanCard: handleFiles(Data.companyPANCard),
      companyGST: handleFiles(Data.companyGSTCertificate),
      bankStatement: handleFiles(Data.bankStatement),
    };
    setloading(true);
    console.log(formData);
    let result = await updateMerchantbyid(
      formData,
      props.varToken,
      props.rowdata._id
    );
    console.log(result);
    setloading(false);
  };

  const handleReset = () => {
    reset(); // Reset the form fields
  };

  return (
    <div>
      <Chip onClick={handleOpen} label="Update" sx={{ bgcolor: "#DCDCDC" }} />
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
                  Update Merchant Form
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
                        id="businessName"
                        label="Business Name"
                        error={!!errors.businessName}
                        helperText={errors.businessName?.message}
                        {...register("businessName")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="businessType"
                        label="Business Type"
                        error={!!errors.businessType}
                        helperText={errors.businessType?.message}
                        {...register("businessType")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="businessCategory"
                        label="Business Category"
                        error={!!errors.businessCategory}
                        helperText={errors.businessCategory?.message}
                        {...register("businessCategory")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="businessSubCategory"
                        label="Business Sub Category"
                        error={!!errors.businessSubCategory}
                        helperText={errors.businessSubCategory?.message}
                        {...register("businessSubCategory")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="address"
                        label="Address"
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        {...register("address")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="pincode"
                        label="Pincode"
                        error={!!errors.pincode}
                        helperText={errors.pincode?.message}
                        {...register("pincode")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="city"
                        label="City"
                        error={!!errors.city}
                        helperText={errors.city?.message}
                        {...register("city")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="state"
                        label="State"
                        error={!!errors.state}
                        helperText={errors.state?.message}
                        {...register("state")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="country"
                        label="Country"
                        error={!!errors.country}
                        helperText={errors.country?.message}
                        {...register("country")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="companyExpenditure"
                        label="Company Expenditure"
                        error={!!errors.companyExpenditure}
                        helperText={errors.companyExpenditure?.message}
                        {...register("companyExpenditure")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="website"
                        label="Website"
                        error={!!errors.website}
                        helperText={errors.website?.message}
                        {...register("website")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="bankName"
                        label="Bank Name"
                        error={!!errors.bankName}
                        helperText={errors.bankName?.message}
                        {...register("bankName")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="bankAccountNumber"
                        label="Bank Account Number"
                        error={!!errors.bankAccountNumber}
                        helperText={errors.bankAccountNumber?.message}
                        {...register("bankAccountNumber")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="bankIFSCCode"
                        label="Bank IFSC Code"
                        error={!!errors.bankIFSCCode}
                        helperText={errors.bankIFSCCode?.message}
                        {...register("bankIFSCCode")}
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

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="panNumber"
                        label="PAN Number"
                        error={!!errors.panNumber}
                        helperText={errors.panNumber?.message}
                        {...register("panNumber")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="aadharNumber"
                        label="Aadhar Number"
                        error={!!errors.aadharNumber}
                        helperText={errors.aadharNumber?.message}
                        {...register("aadharNumber")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="transactionLimit"
                        label="Transaction Limit"
                        error={!!errors.transactionLimit}
                        helperText={!errors.transactionLimit?.message}
                        {...register("transactionLimit")}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <TextField
                        id="amount"
                        label="Amount"
                        error={!!errors.amount}
                        helperText={!errors.amount?.message}
                        {...register("amount")}
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
                >
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <label htmlFor="companyPANCard">Company PAN Card</label>
                      {props.rowdata.kyc_documents.company_pan_card != "" ? (
                        <Link href="#" target="_blank">
                          Link
                        </Link>
                      ) : (
                        <Input
                          id="companyPANCard"
                          sx={{
                            borderRadius: 1,
                            border: "1px solid #ced4da",
                            mb: 1,
                            borderBlock: "1px solid #ced4da",
                            width: "100%",
                            pl: 0.9,
                            pt: 1.3,
                            pb: 1.3,
                          }}
                          type="file"
                          inputProps={{ accept: "image/*" }}
                          error={!!errors.companyPANCard}
                          {...register("companyPANCard")}
                        />
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <label htmlFor="companyGSTCertificate">
                        Company GST Certificate
                      </label>
                      {props.rowdata.kyc_documents.company_gst != "" ? (
                        <Link href="#" target="_blank">
                          Link
                        </Link>
                      ) : (
                        <Input
                          id="companyGSTCertificate"
                          sx={{
                            borderRadius: 1,
                            border: "1px solid #ced4da",
                            mb: 1,
                            borderBlock: "1px solid #ced4da",
                            width: "100%",
                            pl: 0.9,
                            pt: 1.3,
                            pb: 1.3,
                          }}
                          type="file"
                          inputProps={{ accept: "image/*" }}
                          error={!!errors.companyGSTCertificate}
                          {...register("companyGSTCertificate")}
                        />
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth>
                      <label htmlFor="bankStatement">Bank Statement</label>
                      {props.rowdata.kyc_documents.bank_statement != "" ? (
                        <Link href="#" target="_blank">
                          Link
                        </Link>
                      ) : (
                        <Input
                          id="bankStatement"
                          sx={{
                            borderRadius: 1,
                            border: "1px solid #ced4da",
                            mb: 1,
                            borderBlock: "1px solid #ced4da",
                            width: "100%",
                            pl: 0.9,
                            pt: 1.3,
                            pb: 1.3,
                          }}
                          type="file"
                          inputProps={{ accept: "image/*" }}
                          error={!!errors.bankStatement}
                          {...register("bankStatement")}
                        />
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <br />
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
                    Update
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
