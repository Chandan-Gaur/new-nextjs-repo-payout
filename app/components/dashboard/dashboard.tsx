import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CountUp from "react-countup";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Barcharts from "../Charts/Barcharts";
import PieCharts from "../Charts/PieCharts";
import AddMarchantAmount from "../AddAmount/addAmount";
import AddAmount from "../AddAmount/addAmount";

const Dashboard = ({ dashboard }: any) => {
  return (
    <>
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
        <Box height={20} />
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Stack spacing={2} direction="row">
              <Card
                sx={{ minWidth: 49 + "%", height: 150 }}
                className="gradient"
              >
                <CardContent>
                  <div>
                    <CurrencyRupeeIcon sx={{ color: "#fff" }} />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: "#fff" }}
                  >
                    <CountUp
                      delay={0.3}
                      end={dashboard.totalAmount}
                      duration={0.4}
                    />
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ color: "#fff" }}
                  >
                    Total Amount
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{ minWidth: 49 + "%", height: 150 }}
                className="gradient2"
              >
                <CardContent>
                  <div>
                    <ShoppingBagIcon sx={{ color: "#fff" }} />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: "#fff" }}
                  >
                    <CountUp
                      delay={0.4}
                      end={dashboard.requestCount}
                      duration={0.4}
                    />
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ color: "#fff" }}
                  >
                    Total Request Count
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2}>
              <Card sx={{ maxwidth: 345 }} className="gradient2">
                <Stack spacing={2} direction="row">
                  <div className="icon-style">
                    <StorefrontIcon sx={{ color: "#fff" }} />
                  </div>

                  <div className="padding-all">
                    <span className="price-title">
                      <CountUp
                        delay={0.4}
                        end={dashboard.successAmount}
                        duration={0.4}
                      />
                    </span>
                    <br />
                    <span className="sub-title">Success Amount</span>
                  </div>
                </Stack>
              </Card>
              <Card sx={{ maxwidth: 345 }} className="gradient3">
                <Stack spacing={2} direction="row">
                  <div className="icon-style">
                    <StorefrontIcon sx={{ color: "#fff" }} />
                  </div>

                  <div className="padding-all">
                    <span className="price-title">
                      <CountUp
                        delay={0.2}
                        end={dashboard.uniqueMerchants}
                        duration={0.6}
                      />
                    </span>
                    <br />
                    <span className="sub-title">Unique Merchants</span>
                  </div>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
        <Box height={20} />
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Card sx={{ height: 55 + "vh" }}>
              <CardContent>
                <Barcharts />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ height: 55 + "vh" }}>
              <CardContent>
                <div className="padding-all">
                  <span className="payout-title">Add Amount</span>
                  <br />
                </div>
                <AddAmount />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
