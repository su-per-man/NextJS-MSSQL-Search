import { Code } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const columns = [
  { id: "fname", label: "First Name" },
  { id: "lname", label: "Last Name" },
  { id: "sex", label: "Sex" },
  { id: "dno", label: "Department No" },
];
interface IRow {
  fname?: string;
  lname?: string;
  sex?: string;
  dno?: string;
}

export default function Home() {
  const [rows, setRows] = useState<IRow[]>([]);
  const [search, setSearch] = useState("");

  const fetchResults = () => {
    axios
      .get(`http://localhost:3000/api/fetch?q=${search}`)
      .then((res) => {
        setRows(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Code />
          </IconButton>
          <Typography variant="body1" noWrap component="div">
            Suman Kumar (2861070)
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper style={{ marginTop: 30 }}>
        <TextField
          label="Type here to search ..."
          variant="outlined"
          size="small"
          fullWidth
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button
          variant="contained"
          style={{ marginTop: 15 }}
          fullWidth
          onClick={() => fetchResults()}
        >
          Search
        </Button>
      </Paper>
      <TableContainer sx={{ maxHeight: 440, marginTop: 2 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: IRow, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.id}>
                        {row[column.id as keyof typeof rows.keys]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
