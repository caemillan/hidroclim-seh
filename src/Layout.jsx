import { AppBar, Toolbar, Typography, Box, Tabs, Tab } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const paths = ["/plataformas", "/bases", "/faq", "/acerca"];
  const current = paths.includes(location.pathname) ? location.pathname : "/plataformas";

  const handleChange = (_e, value) => navigate(value);

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#0B6FA4" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              lineHeight: 1.1,
              fontWeight: 700,
            }}
          >
            Hidroclim Data
            <Typography
              component="div"
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 400,
                opacity: 0.9,
              }}
            >
              Plataformas y bases de datos de la Dirección de Hidrología de SENAMHI
            </Typography>
          </Typography>


          <Box sx={{ minWidth: 520 }}>
            <Tabs
              value={current}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTab-root": { color: "white", textTransform: "none" },
                "& .Mui-selected": { color: "white", fontWeight: 700 },
                "& .MuiTabs-indicator": { backgroundColor: "white" },
              }}
            >
              <Tab label="Plataformas" value="/plataformas" />
              <Tab label="Bases de datos" value="/bases" />
              <Tab label="Preguntas frecuentes" value="/faq" />
              <Tab label="Acerca de" value="/acerca" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
}
