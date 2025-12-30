import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box, Button, Chip, Container, Typography, Card, CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { loadCatalogo } from "../lib/catalogo";

export default function DetallePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadCatalogo().then(setItems).catch(() => setItems([]));
  }, []);

  const item = useMemo(() => items.find((x) => x.id === id), [items, id]);

  if (!item) {
    return (
      <Container maxWidth="md" className="py-6">
        <Button startIcon={<ArrowBackIcon />} onClick={() => nav(-1)}>
          Volver
        </Button>
        <Typography variant="h6" className="mt-4">
          No encontrado: {id}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="py-6">
      <Button startIcon={<ArrowBackIcon />} onClick={() => nav(-1)}>
        Volver
      </Button>

      <Card className="mt-4 rounded-2xl shadow-sm">
        <CardContent>
          <Typography variant="h5" className="font-semibold">
            {item.nombre}
          </Typography>
          <Typography variant="body1" className="text-gray-700 mt-2">
            {item.descripcion}
          </Typography>

          <Box className="mt-4 flex flex-wrap gap-2">
            {item.tipo && <Chip label={item.tipo} />}
            {(item.variables || []).map((v) => <Chip key={v} label={v} variant="outlined" />)}
            {(item.resolucion || []).map((r) => <Chip key={r} label={r} variant="outlined" />)}
            {(item.dominio || []).map((d) => <Chip key={d} label={d} variant="outlined" />)}
          </Box>

          <Box className="mt-4 text-sm text-gray-700 space-y-1">
            <div><b>Institución:</b> {item.institucion || "—"}</div>
            <div><b>URL:</b> {item.url || "—"}</div>
          </Box>

          <Box className="mt-5">
            <Button
              variant="contained"
              className="bg-senamhi-primary hover:bg-senamhi-dark"
              endIcon={<OpenInNewIcon />}
              onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
              disabled={!item.url}
            >
              Abrir plataforma
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
