import { Container, Typography } from "@mui/material";

export default function AcercaPage() {
  return (
    <Container maxWidth="md" className="py-6">
      <Typography variant="h5" className="font-semibold">
        Acerca de
      </Typography>
      <Typography className="mt-3 text-gray-700">
        Catálogo de plataformas y servicios de SENAMHI. Este portal actúa como directorio y
        redirige a sistemas externos (dashboards, APIs, visores, etc.).
      </Typography>
    </Container>
  );
}
