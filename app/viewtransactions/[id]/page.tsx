"use client";
import * as React from "react";
import moment from "moment";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  getmerchant_transaction_by_merchant_id,
  getmerchant_transaction_by_merchant_token,
} from "@/app/Service/Api";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  LinearProgress,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { useRouter } from "next/navigation";
import MiniDrawer from "@/app/components/sidebar/sidenav";
import { useEffect } from "react";
import { CustomizedMenus } from "@/app/merchants/utils/menupop";
import { utils, writeFileXLSX } from "xlsx";
import { useSession } from "next-auth/react";
export default function viewtransaction({ params }: { params: any }) {
  const router = useRouter();
  const [mtransactions, setMtransactions] = React.useState([]);
  const [marchant_name, set_marchant_name] = React.useState("");

  const { data: session, status } = useSession();
  useEffect(() => {
    let token = status == "authenticated" && session && session.user.token;
    const str = params.id;
    const arr = str.split("with");
    const str1 = arr[0];
    const str2 = arr[1];
    const decodedStr = decodeURIComponent(str2);
    if (decodedStr === "undefined") {
      set_marchant_name("All");
    } else {
      set_marchant_name(decodedStr);
    }
    async function call() {
      if (token != "" && token != undefined) {
        try {
          const result =
            str1 == "all" && str2 == undefined
              ? await getmerchant_transaction_by_merchant_token(token.token)
              : await getmerchant_transaction_by_merchant_id(token.token, str1);
          //  console.log(result);
          if (result != "error" && result.length > 0) {
            setMtransactions(result);
          }
        } catch (error) {
          //console.log(error);
        }
      } else {
        router.push("/");
      }
    }
    call();
  }, [session, status]);
  function generateRandom() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  function gg() {
    const wb = utils.book_new();
    utils.book_append_sheet(wb, utils.json_to_sheet(rows));
    writeFileXLSX(wb, "testyy.xlsx");
  }
  const columns: GridColDef[] = [
    // { field: "srno", headerName: "Sr. No.", width: 70 },
    {
      field: "withdrawal_id",
      headerName: "Withdrawal ID",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "customer_code",
      headerName: "Customer Code",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "customer_name",
      headerName: "Coustmer Name",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 180,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        //  const date = new Date();
        const dateString = moment(params.value).format("DD-MM-YYYY HH:mm:ss");
        return dateString;
      },
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      width: 180,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        //  const date = new Date();
        const dateString = moment(params.value).format("DD-MM-YYYY HH:mm:ss");
        return dateString;
      },
    },
    {
      field: "merchant_status",
      headerName: "Status",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "utr",
      headerName: "UTR",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      width: 180,
      renderCell: (params) => {
        return <CustomizedMenus value={params.row} />;
      },
    },
  ];
  const rows: any = [];
  if (mtransactions.length > 0) {
    mtransactions.forEach((value: any) => {
      rows.push(value);
    });
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MiniDrawer
        userType={session?.user.token.userType}
        username={session?.user.token.username}
      />
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 3,
          mt: 7,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box style={{ height: "h-100vh", width: "100%" }}>
          <AppBar position="static" color="transparent" elevation={2}>
            <Toolbar
              color="transparent"
              sx={{ justifyContent: "space-between" }}
            >
              <Button color="primary" variant="contained" onClick={gg}>
                EXPORT ALL
              </Button>

              <Button color="primary" variant="contained" onClick={gg}>
                Import
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
            slotProps={{
              toolbar: {
                csvOptions: { disableToolbarButton: false },
                printOptions: { disableToolbarButton: true },
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 250 },
              },
            }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            getRowId={(row: any) => generateRandom()}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Box>
  );
}
