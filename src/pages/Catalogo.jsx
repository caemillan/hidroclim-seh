import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useNavigate, useSearchParams } from "react-router-dom";
import { loadCatalogo } from "../lib/catalogo";
import Filtros from "../components/Filtros";

function uniq(arr) {
  return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
}

export default function CatalogoPage({ defaultTab = "plataformas" }) {
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
    <Container maxWidth="lg" className="py-6">
      {/* Header + resumen */}
      <Box className="mb-4">
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
              Limpiar filtros
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Botón flotante para mostrar filtros */}
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
          <IconButton onClick={() => setOpen(false)}>
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

        <Grid container spacing={2}>
          {filtrados.map((x) => (
            <Grid item xs={12} sm={6} md={4} key={x.id}>
              <Card className="h-full rounded-2xl shadow-sm">
                <CardContent>
                  <Typography variant="h6" className="font-semibold">
                    {x.nombre}
                  </Typography>

                  <Typography variant="body2" className="text-gray-600 mt-1">
                    {x.descripcion}
                  </Typography>

                  <Box className="mt-3 flex flex-wrap gap-1">
                    {x.tipo && <Chip size="small" label={x.tipo} />}
                    {(x.variables || []).slice(0, 3).map((v) => (
                      <Chip key={v} size="small" label={v} variant="outlined" />
                    ))}
                  </Box>

                  <Box className="mt-2 text-sm text-gray-600">
                    <div>
                      <b>Institución:</b> {x.institucion || "—"}
                    </div>
                    <div>
                      <b>Resolución:</b> {(x.resolucion || []).join(", ") || "—"}
                    </div>
                    <div>
                      <b>Dominio:</b> {(x.dominio || []).join(", ") || "—"}
                    </div>
                  </Box>
                </CardContent>

                <CardActions className="px-4 pb-4 flex gap-2">
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
                    className="bg-senamhi-primary hover:bg-senamhi-dark"
                    endIcon={<OpenInNewIcon />}
                    onClick={() => window.open(x.url, "_blank", "noopener,noreferrer")}
                    disabled={!x.url}
                  >
                    Ir
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
