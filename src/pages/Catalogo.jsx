
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import TableRowsIcon from "@mui/icons-material/TableRows";

import { useEffect, useMemo, useState } from "react";

import {
  Box, Button, ToggleButton, ToggleButtonGroup,
  FormControl, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableHead, TableRow, Paper,
  Chip,
  Container, 
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Drawer,
  IconButton,
  useMediaQuery
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useNavigate, useSearchParams } from "react-router-dom";
import { loadCatalogo } from "../lib/catalogo";
import Filtros from "../components/Filtros";

function uniq(arr) {
  return Array.from(
    new Set(
      (arr || [])
        .filter((v) => v != null)   // quita null/undefined
        .map((v) => String(v))      // convierte todo a string
    )
  ).sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));
}


export default function CatalogoPage({ defaultTab = "plataformas" }) {
  const [view, setView] = useState("cards"); // cards | list | table
  const [sortBy, setSortBy] = useState("nombre"); // nombre | institucion | tipo
  // const [sortDir, setSortDir] = useState("asc"); // asc | desc

  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();

  // Drawer state (✅ 2.2)
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [open, setOpen] = useState(isDesktop);

  useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  const [q, setQ] = useState(searchParams.get("q") || "");
  const [tipo, setTipo] = useState(searchParams.get("tipo") || "");
  const [variable, setVariable] = useState(searchParams.get("variable") || "");
  const [resolucion, setResolucion] = useState(searchParams.get("resolucion") || "");
  const [dominio, setDominio] = useState(searchParams.get("dominio") || "");

  useEffect(() => {
    loadCatalogo()
      .then(setItems)
      .catch((e) => {
        console.error(e);
        setItems([]);
      });
  }, []);

  const itemsTab = useMemo(() => {
    return items.filter((x) => (x.categoria || "plataformas") === defaultTab);
  }, [items, defaultTab]);

  const filtros = useMemo(() => {
    return {
      tipos: uniq(itemsTab.map((x) => x.tipo).filter(Boolean)),
      variables: uniq(itemsTab.flatMap((x) => x.variables || []).filter(Boolean)),
      resoluciones: uniq(itemsTab.flatMap((x) => x.resolucion || []).filter(Boolean)),
      dominios: uniq(itemsTab.flatMap((x) => x.dominio || []).filter(Boolean)),
    };
  }, [itemsTab]);

  const filtrados = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return itemsTab.filter((x) => {
      const matchQ =
        !qq ||
        (x.nombre || "").toLowerCase().includes(qq) ||
        (x.descripcion || "").toLowerCase().includes(qq) ||
        (x.institucion || "").toLowerCase().includes(qq);

      const matchTipo = !tipo || x.tipo === tipo;
      const matchVar = !variable || (x.variables || []).includes(variable);
      const matchRes = !resolucion || (x.resolucion || []).includes(resolucion);
      const matchDom = !dominio || (x.dominio || []).includes(dominio);

      return matchQ && matchTipo && matchVar && matchRes && matchDom;
    });
  }, [itemsTab, q, tipo, variable, resolucion, dominio]);

  //Ordenamiento (usa esto después de filtrados) ==========================================================================
  const sorted = useMemo(() => {
  const getKey = (x) => {
    if (sortBy === "nombre") return x.nombre ?? "";
    if (sortBy === "institucion") return x.institucion ?? "";
    if (sortBy === "tipo") return x.tipo ?? "";
    return "";
  };

  return [...filtrados].sort((a, b) => {
    const aa = String(getKey(a));
    const bb = String(getKey(b));
    return aa.localeCompare(bb, "es", { sensitivity: "base" });
  });
}, [filtrados, sortBy]);



  const syncUrl = (next) => {
    const sp = Object.fromEntries(searchParams.entries());
    const merged = { ...sp, ...next };
    Object.keys(merged).forEach((k) => {
      if (merged[k] === "" || merged[k] == null) delete merged[k];
    });
    setSearchParams(merged);
  };

  const clear = () => {
    setQ("");
    setTipo("");
    setVariable("");
    setResolucion("");
    setDominio("");
    syncUrl({ q: "", tipo: "", variable: "", resolucion: "", dominio: "" });
  };

  return (
    <Container maxWidth="xl" className="py-6" sx={{ px: { xs: 2, md: 3 } }}>

      {/* Header + resumen */}
      {/* <Box className="mb-4">
        <Typography variant="h5" className="font-semibold mb-2">
          Explorar
        </Typography>

        <Box className="mt-3 flex items-center justify-between">
          <Typography variant="body2" className="text-gray-600">
            Mostrando <b>{filtrados.length}</b> de <b>{itemsTab.length}</b>
          </Typography>

          <Box className="flex items-center gap-2">
            {!isDesktop && (
              <Button variant="outlined" onClick={() => setOpen(true)} startIcon={<FilterListIcon />}>
                Filtros
              </Button>
            )}
            <Button variant="outlined" onClick={clear}>
              Limpiar filtros2
            </Button>
          </Box>
        </Box>
      </Box> */}
      
      {/* Botón flotante para mostrar filtros */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 , justifyContent: "flex-end" }}>
        {/* Vista: cards/list/table */}
        <ToggleButtonGroup
          size="small"
          value={view}
          exclusive
          onChange={(_, v) => v && setView(v)}
        >
          <ToggleButton value="cards" aria-label="Tarjetas">
            <ViewModuleIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list" aria-label="Lista">
            <ViewListIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="table" aria-label="Tabla">
            <TableRowsIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Ordenar por */}
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Ordenar por</InputLabel>
          <Select
            value={sortBy}
            label="Ordenar por"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="nombre">Nombre</MenuItem>
            <MenuItem value="institucion">Institución</MenuItem>
            <MenuItem value="tipo">Tipo</MenuItem>
          </Select>
        </FormControl>

        {/* Contador (opcional) */}
        {/* <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
          Mostrando <b>{sorted.length}</b> de <b>{itemsTab.length}</b>
        </Typography> */}
      </Box>


      {!open && (
        <Box
          sx={{
            position: "fixed",
            top: 120,        // debajo del AppBar
            left: 8,
            zIndex: 1201,    // encima del contenido
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              bgcolor: "#0B6FA4",
              color: "white",
              "&:hover": { bgcolor: "#095c88" },
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>
      )}


      {/* Drawer de filtros */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        variant={isDesktop ? "persistent" : "temporary"}
        PaperProps={{
          sx: {
            top: 64,          // altura del AppBar
            height: "calc(100% - 64px)",
        },
  }}
      >
        {/* Botón cerrar dentro del panel (tipo DataClima) */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton 
          
          onClick={() => setOpen(false)}
          sx={{
          // bgcolor: "#fffb00ff",
          // color: "white",
          // "&:hover": { bgcolor: "#8da40bff" },
      }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>

        <Filtros
          q={q}
          setQ={(v) => {
            setQ(v);
            syncUrl({ q: v });
          }}
          tipo={tipo}
          setTipo={(v) => {
            setTipo(v);
            syncUrl({ tipo: v });
          }}
          tipos={filtros.tipos}
          variable={variable}
          setVariable={(v) => {
            setVariable(v);
            syncUrl({ variable: v });
          }}
          variables={filtros.variables}
          resolucion={resolucion}
          setResolucion={(v) => {
            setResolucion(v);
            syncUrl({ resolucion: v });
          }}
          resoluciones={filtros.resoluciones}
          dominio={dominio}
          setDominio={(v) => {
            setDominio(v);
            syncUrl({ dominio: v });
          }}
          dominios={filtros.dominios}
          onClear={clear}
        />
      </Drawer>

      {/* Contenido principal (se desplaza si el panel está abierto en desktop) */}
      <Box sx={{ ml: open && isDesktop ? "280px" : 0, transition: "margin 0.3s" }}>
        {!isDesktop && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={() => setOpen(true)}>
              <FilterListIcon />
            </IconButton>
          </Box>
        )}

        {/* ======= VISTA: CARDS ======= */}
{view === "cards" && (
  <Box
    sx={{
      display: "grid",
      gap: 2,
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, minmax(0, 1fr))",
        md: "repeat(3, minmax(0, 1fr))",
      },
      alignItems: "stretch",
    }}
  >
    {sorted.map((x) => (
      <Card
        key={x.id}
        sx={{
          width: "100%",
          minWidth: 0, // ✅ clave
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
        }}
        className="shadow-sm"
      >
        {x.imagen && (
          <Box
            component="img"
            src={`${import.meta.env.BASE_URL}${x.imagen.replace(/^\//, "")}`}
            alt={x.nombre}
            sx={{
              width: "100%",
              height: 160,
              objectFit: "cover",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
        )}

        <CardContent sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              minWidth: 0,
            }}
          >
            {x.nombre}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 1,
              overflowWrap: "anywhere", // ✅ evita que el texto cambie el ancho
              wordBreak: "break-word",
              display: "-webkit-box",   // ✅ 3 líneas y corta
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            {x.descripcion}
          </Typography>

          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {x.tipo && <Chip size="small" label={x.tipo} />}
            {(x.variables || []).slice(0, 3).map((v) => (
              <Chip key={v} size="small" label={v} variant="outlined" />
            ))}
          </Box>

          <Box sx={{ mt: 1.5, fontSize: 14, color: "text.secondary" }}>
            <div><b>Institución:</b> {x.institucion || "—"}</div>
            <div><b>Resolución:</b> {(x.resolucion || []).join(", ") || "—"}</div>
            <div><b>Dominio:</b> {(x.dominio || []).join(", ") || "—"}</div>
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<InfoOutlinedIcon />}
            onClick={() => nav(`/plataforma/${x.id}`)}
          >
            Ver detalle
          </Button>

          <Button
            fullWidth
            variant="contained"
            endIcon={<OpenInNewIcon />}
            onClick={() => window.open(x.url, "_blank", "noopener,noreferrer")}
            disabled={!x.url}
          >
            Ir
          </Button>
        </CardActions>
      </Card>
    ))}
  </Box>
)}


        {/* ======= VISTA: LISTA ======= */}
        {view === "list" && (
          <Box className="space-y-2">
            {sorted.map((x) => (
              <Paper key={x.id} className="p-3 rounded-2xl">
                <Box className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" className="font-semibold" noWrap>
                      {x.nombre}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {x.descripcion}
                    </Typography>

                    <Typography variant="caption" className="text-gray-600 block mt-1">
                      {(x.institucion || "—")} • {(x.resolucion || []).join(", ") || "—"} • {(x.dominio || []).join(", ") || "—"}
                    </Typography>
                  </Box>

                  <Box className="flex gap-2">
                    <Button variant="outlined" onClick={() => nav(`/plataforma/${x.id}`)}>
                      Ver detalle
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => window.open(x.url, "_blank", "noopener,noreferrer")}
                      disabled={!x.url}
                    >
                      Ir
                    </Button>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )}

        {/* ======= VISTA: TABLA ======= */}
        {view === "table" && (
          <Paper className="rounded-2xl overflow-hidden">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><b>Nombre</b></TableCell>
                  <TableCell><b>Tipo</b></TableCell>
                  <TableCell><b>Institución</b></TableCell>
                  <TableCell><b>Resolución</b></TableCell>
                  <TableCell><b>Dominio</b></TableCell>
                  <TableCell align="right"><b>Acciones</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sorted.map((x) => (
                  <TableRow key={x.id} hover>
                    <TableCell>{x.nombre}</TableCell>
                    <TableCell>{x.tipo || "—"}</TableCell>
                    <TableCell>{x.institucion || "—"}</TableCell>
                    <TableCell>{(x.resolucion || []).join(", ") || "—"}</TableCell>
                    <TableCell>{(x.dominio || []).join(", ") || "—"}</TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined" onClick={() => nav(`/plataforma/${x.id}`)}>
                        Detalle
                      </Button>
                      <Button
                        size="small"
                        sx={{ ml: 1 }}
                        variant="contained"
                        onClick={() => window.open(x.url, "_blank", "noopener,noreferrer")}
                        disabled={!x.url}
                      >
                        Ir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}

      </Box>
    </Container>
  );
}
