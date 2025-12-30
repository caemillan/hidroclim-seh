import { Container, Typography, Box } from "@mui/material";

export default function FAQPage() {
  return (
    <Container maxWidth="md" className="py-6">
      <Typography variant="h5" className="font-semibold">
        Preguntas frecuentes
      </Typography>

      <Box className="mt-4 space-y-4 text-gray-700">
        <div>
          <b>¿Este portal almacena datos?</b>
          <p>
            No. Este catálogo actúa únicamente como un directorio que redirige
            a plataformas y servicios externos.
          </p>
        </div>

        <div>
          <b>¿Los datos pertenecen a SENAMHI?</b>
          <p>
            Depende de la plataforma. Cada ficha indica la institución
            responsable y la licencia correspondiente.
          </p>
        </div>

        <div>
          <b>¿Puedo descargar datos desde aquí?</b>
          <p>
            No directamente. Los enlaces llevan al sistema oficial donde los
            datos son publicados.
          </p>
        </div>
      </Box>
    </Container>
  );
}
