import { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Chip,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function uniq(arr) {
  return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
}

export default function App() {
  const [items, setItems] = useState([]);

  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState("");
  const [variable, setVariable] = useState("");
  const [resolucion, setResolucion] = useState("");
  const [dominio, setDominio] = useState("");

  useEffect(() => {
    fetch("/catalogo.json")
      .then((r) => r.json())
      .then(setItems)
      .catch((e) => {
        console.error("No se pudo cargar /catalogo.json", e);
        setItems([]);
      });
  }, []);

  const filtros = useMemo(() => {
    return {
      tipos: uniq(items.map((x) => x.tipo).filter(Boolean)),
      variables: uniq(items.flatMap((x) => x.variables || []).filter(Boolean)),
      resoluciones: uniq(items.flatMap((x) => x.resolucion || []).filter(Boolean)),
      dominios: uniq(items.flatMap((x) => x.dominio || []).filter(Boolean)),
    };
  }, [items]);

  const filtrados = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return items.filter((x) => {
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
  }, [items, q, tipo, variable, resolucion, dominio]);

  const clear = () => {
    setQ("");
    setTipo("");
    setVariable("");
    setResolucion("");
    setDominio("");
  };

  return (
    <>
      <CssBaseline />

      <AppBar position="sticky" elevation={0} className="bg-senamhi-primary">
        <Toolbar className="flex justify-between">
          <Typography variant="h6" className="font-semibold">
            Catálogo SENAMHI
          </Typography>
          <Typography variant="body2" className="opacity-90">
            Plataformas y servicios
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="py-6">
        <Box className="mb-4">
          <Typography variant="h5" className="font-semibold mb-2">
            Explorar
          </Typography>

          <Box className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <TextField
              label="Buscar"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="PISCO, radar, Rímac..."
              size="small"
            />

            <FormControl size="small">
              <InputLabel>Tipo</InputLabel>
              <Select value={tipo} label="Tipo" onChange={(e) => setTipo(e.target.value)}>
                <MenuItem value="">Todos</MenuItem>
                {filtros.tipos.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel>Variable</InputLabel>
              <Select
                value={variable}
                label="Variable"
                onChange={(e) => setVariable(e.target.value)}
              >
                <MenuItem value="">Todas</MenuItem>
                {filtros.variables.map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel>Resolución</InputLabel>
              <Select
                value={resolucion}
                label="Resolución"
                onChange={(e) => setResolucion(e.target.value)}
              >
                <MenuItem value="">Todas</MenuItem>
                {filtros.resoluciones.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel>Dominio</InputLabel>
              <Select
                value={dominio}
                label="Dominio"
                onChange={(e) => setDominio(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {filtros.dominios.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box className="mt-3 flex items-center justify-between">
            <Typography variant="body2" className="text-gray-600">
              Mostrando <b>{filtrados.length}</b> de <b>{items.length}</b>
            </Typography>
            <Button variant="outlined" onClick={clear}>
              Limpiar filtros
            </Button>
          </Box>
        </Box>

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
                    <div><b>Institución:</b> {x.institucion || "—"}</div>
                    <div><b>Resolución:</b> {(x.resolucion || []).join(", ") || "—"}</div>
                    <div><b>Dominio:</b> {(x.dominio || []).join(", ") || "—"}</div>
                  </Box>
                </CardContent>

                <CardActions className="px-4 pb-4">
                  <Button
                    fullWidth
                    variant="contained"
                    className="bg-senamhi-primary hover:bg-senamhi-dark"
                    endIcon={<OpenInNewIcon />}
                    onClick={() => window.open(x.url, "_blank", "noopener,noreferrer")}
                    disabled={!x.url}
                  >
                    Ir a la plataforma
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
