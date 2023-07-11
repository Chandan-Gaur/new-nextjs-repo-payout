"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { getallmerchants } from "@/app/Service/Api";
import { CustomizedMenus } from "../utils/menupop";
import {
  AppBar,
  Box,
  Button,
  Chip,
  LinearProgress,
  Toolbar,
} from "@mui/material";
import { utils, writeFileXLSX } from "xlsx";
import { useEffect } from "react";
import AddMerchant from "@/app/addmerchant/addmerchant";
import UpdateMerchant from "@/app/addmerchant/updatemerchant";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setMerchantData } from "@/redux/features/merchantdata-slice";
const generateRowId = () => {
  let length = 8;
  let charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  //console.log(retVal);
  return retVal.toString();
};
const MerchantDataTable = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const columns: GridColDef[] = [
    {
      field: "user_name",
      headerName: "Merchant Name",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Merchant Email",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mobile",
      headerName: "Mobile Number",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bank_account_number",
      headerName: "Debit Account Number",
      type: "number",
      width: 180,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) =>
        `${params.row.business_detail.bank_account_number}`,
    },
    { field: "status", headerName: "Status", width: 80 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <CustomizedMenus value={params.row} />;
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <Chip color="warning" onClick={() => {}} label="Delete" />;
      },
    },
    {
      field: "V_Transactions",
      headerName: "View Transactions",
      width: 160,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const onClick = (e: any) => {
          // e.preventDefault();
          const currentRow = params.row;
          console.log(currentRow);
          let redirect_location =
            "/viewtransactions/" +
            currentRow._id +
            "with" +
            currentRow.user_name;
          // console.log(redirect_location);
          router.push(redirect_location);
        };
        return (
          <Chip
            onClick={onClick}
            label="View Transactions"
            sx={{ bgcolor: "#b2ebf2" }}
          />
        );
      },
    },
    {
      field: "Update_Transactions",
      headerName: "Update Merchant",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // console.log(params.row);
        return (
          <UpdateMerchant rowdata={params.row} varToken={props.varToken} />
        );
      },
    },
  ];
  var rows: any = [];

  rows = useAppSelector((state) => state.merchantdata);
  // var rrr = rows["merchantdata"];
  // console.log(rrr);
  //}

  useEffect(() => {
    async function call() {
      if (props.varToken && props.role && props.username) {
        try {
          const result = await getallmerchants(props.varToken);
          if (result !== "error" && result.length > 0) {
            dispatch(setMerchantData(result));
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("redirecting to /");
        router.push("/");
      }
    }
    call();
  }, []);

  function gg() {
    const wb = utils.book_new();
    utils.book_append_sheet(wb, utils.json_to_sheet(rows));
    writeFileXLSX(wb, "testyy.xlsx");
  }

  return (
    <Box sx={{ height: "auto", width: "100%" }}>
      <AppBar position="static" color="transparent" elevation={2}>
        <Toolbar
          color="transparent"
          sx={{
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Button color="primary" variant="contained" onClick={gg}>
            EXPORT ALL
          </Button>
          <AddMerchant token={props.varToken} />
          <Button color="primary" variant="contained" onClick={gg}>
            IMPORT
          </Button>
        </Toolbar>
      </AppBar>
      <DataGrid
        sx={{
          padding: 2,
          boxShadow: 2,
        }}
        slots={{
          loadingOverlay: LinearProgress,
          toolbar: GridToolbar,
        }}
        className="Table"
        loading={rows.length === 0 ? true : false}
        rows={rows["merchantdata"]}
        columns={columns}
        slotProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: false },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 250 },
          },
        }}
        getRowId={(row: any) => generateRowId()}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 45 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default MerchantDataTable;
