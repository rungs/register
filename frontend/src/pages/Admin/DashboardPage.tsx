import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Card,
  Stack,
  CardContent,
} from "@mui/material";

import { GetRegisterAll } from "../../services/registerApi";
import { useNavigate } from "react-router-dom";
type Props = {};

const columns = [
  { field: "registerType", headerName: "Register type", width: 120 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "mobilePhone",
    headerName: "Mobile phone",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "cardId",
    headerName: "Card ID",
    width: 150,
  },
  {
    field: "birthDate",
    headerName: "Birth date",
    width: 130,

    valueFormatter: (params: any) =>
      params?.value ? moment(params?.value).format("DD/MM/YYYY") : null,
  },
  {
    field: "contactPerson",
    headerName: "Contact person",
    width: 150,
  },
  {
    field: "taxId",
    headerName: "Tax ID",
    width: 150,
  },
  {
    field: "address",
    headerName: "Address",
    width: 250,
  },
  {
    field: "createdDate",
    headerName: "Created date",
    width: 180,
    valueFormatter: (params: any) =>
      moment(params?.value).format("DD/MM/YYYY HH:mm"),
  },
];

export default function DashboardPage({}: Props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [cntTotal, setCntTotal] = useState({
    cntPerson: 0,
    cntCompany: 0,
  });

  useEffect(() => {
    async function isCheckAuth() {
      let isAuth = await localStorage.getItem("isAuth");
      if (isAuth == null) {
        navigate("/login");
      }
      else{
        GetRegisterAll().then((res) => {
          setData(res.data);
    
          const cntPerson = res.data.filter((i: any) => {
            return i.registerType === "person";
          });
    
          const cntCompany = res.data.filter((i: any) => {
            return i.registerType !== "person";
          });
          setCntTotal({
            cntCompany: cntCompany.length,
            cntPerson: cntPerson.length,
          });
        });
      }
    }

    isCheckAuth();

    
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button color="inherit" onClick={()=>{
              localStorage.clear();
              navigate("/login");
            }}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Stack direction={"row"} justifyContent="space-evenly">
        <Card sx={{ minWidth: 275, m: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Register type - Company
            </Typography>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              {cntTotal.cntCompany}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, m: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Register type - Person
            </Typography>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              {cntTotal.cntPerson}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
}
