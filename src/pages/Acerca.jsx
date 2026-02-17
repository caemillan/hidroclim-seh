import { Container, Typography, Box, Divider, Link, Alert} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";


export default function AcercaPage() {
  return (
    <Container maxWidth="md" className="py-6">
      <Typography variant="h4" className="font-semibold">
        ¿Qué es Hidroclim Data?
      </Typography>

      <Typography
        variant="body1"
        className="text-gray-700 mt-3"
        sx={{ textAlign: "justify" }}
      >
        <b>Hidroclim Data</b> es un catálogo interactivo que reúne, describe y vincula{" "}
        <b>plataformas operativas</b> y <b>bases de datos hidrometeorológicas</b> desarrolladas
        por la Subdirección de Estudios e Investigaciones Hidrológicas de la <b>Dirección de Hidrología (DHI)</b> de <b>SENAMHI</b>, así como productos
        generados en colaboración con instituciones nacionales e internacionales.

      </Typography>
{/* incluir un espacio */}

      <Typography
        variant="body1"
        className="text-gray-700 mt-3"
        sx={{ textAlign: "justify" }}
      >
        <br/>
        El objetivo de la plataforma es facilitar el acceso, la exploración y la comprensión de
        los productos disponibles, promoviendo la <b>trazabilidad</b>, el <b>uso responsable</b>{" "}
        de la información y la <b>toma de decisiones informada</b>.
      </Typography>
      <br/> 
      <Divider className="my-6" />
      <br/>

      <Typography variant="h6" className="font-semibold">
        Funcionalidades principales
      </Typography>

      <Box className="mt-3 space-y-4 text-gray-700">
        <div>
          <Typography variant="subtitle1" className="font-semibold">
            🔎 Búsqueda flexible
          </Typography>
          <Typography 
          variant="body2"
          sx={{ textAlign: "justify" }}
          >
            El catálogo permite filtrar plataformas y bases de datos según metadatos como variable,
            resolución temporal, dominio geográfico, tipo de producto e institución responsable.
            Los resultados se visualizan en formato de tarjetas y cada recurso cuenta con una ficha
            detallada.
          </Typography>
        </div>

        {/* <div>
          <Typography variant="subtitle1" className="font-semibold">
            🤖 Asistente virtual
          </Typography>
          <Typography variant="body2">
            Un asistente virtual facilita la exploración del catálogo, respondiendo consultas sobre
            plataformas, bases de datos, coberturas y enlaces de acceso.
          </Typography>

          <Alert severity="info" className="mt-2">
            El asistente tiene un rol orientativo y puede cometer errores o entregar respuestas
            incompletas. Verifica información crítica en los enlaces oficiales o en la ficha
            detallada del recurso.
          </Alert>
        </div> */}

        <div>
          <Typography variant="subtitle1" className="font-semibold" >
            🗄️ Bases de datos
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "justify" }}>
            Hidroclim Data incluye una sección dedicada a bases de datos hidrometeorológicas, con
            información como descripción del producto, variables disponibles, resolución temporal,
            dominio espacial e institución responsable.
          </Typography>
        </div>
      </Box>
              <br/>
      <Divider className="my-6" />

      <Typography variant="h6" className="font-semibold">
        Fuentes de datos y agradecimientos
      </Typography>

      <Typography variant="body2" className="text-gray-700 mt-3" sx={{ textAlign: "justify" }}>
        Muchas de las plataformas y productos indexados utilizan información generada por
        instituciones públicas, centros de investigación y organismos internacionales. Se reconoce
        el esfuerzo permanente por mantener series de datos confiables, continuas y actualizadas. 
        <br/>

               Cada plataforma documenta explícitamente las fuentes de datos utilizadas, promoviendo la
        transparencia, la trazabilidad y el uso responsable de la información.
      </Typography>

      <br/>
      <Divider className="my-6" />

      <Typography variant="h6" className="font-semibold">
        Equipo de trabajo
      </Typography>

      <Typography variant="body2" className="text-gray-700 mt-3" sx={{ textAlign: "justify" }}>
        Hidroclim Data es desarrollada por la <b>Subdirección de Estudios e Investigaciones Hidrológicas (SEH)</b> de la  <b>Dirección de Hidrología (DHI)</b> del{" "}
        <b>Servicio Nacional de Meteorología e Hidrología del Perú (SENAMHI)</b>, como parte de
        iniciativas orientadas a mejorar el acceso a información hidrometeorológica y fortalecer
        los sistemas de monitoreo, análisis y pronóstico.
      </Typography>

      <br/>
      <Divider className="my-6" />
            <Typography variant="h6" className="font-semibold">
        Equipo de desarrollo de Hidroclim Data
      </Typography>

      <Box
        className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-200"
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        {/* Imagen */}
        <Box
          component="img"
          src={`${import.meta.env.BASE_URL}images/wlavado.jpg`}
          alt="Carlos Millán"
          sx={{
            width: 200,
            height: 200,
            borderRadius: "10%",
            objectFit: "cover",
            flexShrink: 0,
            border: "1px solid #e0e0e0",
          }}
        />

        {/* Contenido */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Coordinador de Hidroclim Data
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            <b>Waldo Lavado</b> — Director de la Subdirección de Estudios e Investigaciones Hidrológicas (SEH/DHI – SENAMHI)
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Contacto:{" "}
                <Link href="mailto:wlavado@senamhi.gob.pe" underline="hover">
                  wlavado@senamhi.gob.pe
                </Link>{" "}
            /{" "}
            <Link href="mailto:wlavado@senamhi.gob.pe" underline="hover">
              wlavado@senamhi.gob.pe
            </Link>
          </Typography>

          <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LinkedInIcon />}
              href="https://www.linkedin.com/in/waldo-lavado-casimiro-38110b5a"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-200"
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        {/* Imagen */}
        <Box
          component="img"
          src={`${import.meta.env.BASE_URL}images/cmillan.png`}
          alt="Carlos Millán"
          sx={{
            width: 200,
            height: 200,
            borderRadius: "10%",
            objectFit: "cover",
            flexShrink: 0,
            border: "1px solid #e0e0e0",
          }}
        />

        {/* Contenido */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Desarrollador de Hidroclim Data
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            <b>Carlos Millán</b> — Especialista en hidroinformática (DHI – SENAMHI)
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Contacto:{" "}
            <Link href="mailto:cmillan@senamhi.gob.pe" underline="hover">
              cmillan@senamhi.gob.pe
            </Link>{" "}
            /{" "}
            <Link href="mailto:cmillanarancibia@gmail.com" underline="hover">
              cmillanarancibia@gmail.com
            </Link>
          </Typography>

          <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LinkedInIcon />}
              href="https://www.linkedin.com/in/cmillanarancibia"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Button>

            <Button
              variant="outlined"
              size="small"
              startIcon={<GitHubIcon />}
              href="https://github.com/caemillan"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Box>

      <Typography variant="caption" className="text-gray-500 mt-6 block">
        Nota: Este catálogo está en evolución y puede ampliarse conforme se incorporen nuevas
        plataformas, productos y bases de datos.
      </Typography>
    </Container>


  );
}
