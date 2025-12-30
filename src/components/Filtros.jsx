import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";

export default function Filtros({
  q, setQ,
  tipo, setTipo, tipos,
  variable, setVariable, variables,
  resolucion, setResolucion, resoluciones,
  dominio, setDominio, dominios,
  onClear,
}) {
  return (
    <Box sx={{ width: 280, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filtros
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Buscar"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          size="small"
        />

        <FormControl size="small">
          <InputLabel>Tipo</InputLabel>
          <Select value={tipo} label="Tipo" onChange={(e) => setTipo(e.target.value)}>
            <MenuItem value="">Todos</MenuItem>
            {tipos.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Variable</InputLabel>
          <Select value={variable} label="Variable" onChange={(e) => setVariable(e.target.value)}>
            <MenuItem value="">Todas</MenuItem>
            {variables.map((v) => (
              <MenuItem key={v} value={v}>{v}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Resolución</InputLabel>
          <Select value={resolucion} label="Resolución" onChange={(e) => setResolucion(e.target.value)}>
            <MenuItem value="">Todas</MenuItem>
            {resoluciones.map((r) => (
              <MenuItem key={r} value={r}>{r}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Dominio</InputLabel>
          <Select value={dominio} label="Dominio" onChange={(e) => setDominio(e.target.value)}>
            <MenuItem value="">Todos</MenuItem>
            {dominios.map((d) => (
              <MenuItem key={d} value={d}>{d}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" onClick={onClear}>
          Limpiar filtros
        </Button>
      </Box>
    </Box>
  );
}
