import { Container, Typography, Box } from "@mui/material";

export default function FAQPage() {
  return (
    <Container maxWidth="md" className="py-6">
      <Typography variant="h5" className="font-semibold">
        Preguntas frecuentes
      </Typography>

      <Box className="mt-4 space-y-4 text-gray-700"  sx={{ textAlign: "justify" }}>
        <div>
          <p></p>En esta sección podrás encontrar las consultas más frecuentes que se le han realizado a la aplicación.<p></p>
        </div>
        <div>
          <b>1.- ¿Qué puedo encontrar aquí?</b>
          <p>
            Hidroclim Data es un catálogo interactivo que reúne información sobre las plataformas y
             bases de datos desarrolladas por la Subdirección de Estudios e Investigaciones Hidrológicos de la Dirección de Hidrolgía de SENAMHI Perú.
             El sitio permite conocer, buscar y explorar estos recursos mediante distintos criterios como variables disponibles,
              frecuencia de actualización, dominio geográfico, formato, tipo de datos, instituciones responsables, entre otros.
          </p>
        </div>

        <div>
          <b>2.- ¿Cómo puedo buscar información?</b>
          <p>
            Existen dos formas para encontrar la información que deseas: 
            (1) A través de los filtros disponibles en la sección de Plataformas, 
            donde puedes seleccionar las características que te interesan (por ejemplo, una variable o un tipo de dato).
             Las plataformas que coinciden con tus filtros se ordenan en primer lugar, y se indica cuándo una plataforma no cumple con alguna de tus selecciones.
              (2) Usando el asistente virtual ubicado en la esquina inferior derecha de la pantalla.
               Este chatbot responde preguntas sobre las plataformas y conjuntos de datos.
                Aunque es útil para explorar, puede cometer errores o entregar respuestas incompletas,
                 por lo que se recomienda validar la información crítica directamente en la ficha de cada plataforma.
          </p>
        </div>

                <div>
          <b>3.- ¿Qué es la sección de Plataformas?</b>
          <p>
            En esta sección encontrarás herramientas desarrolladas por la SEH que permiten acceder a datos hidrometeorológicos,
              y de otras variables relevantes. 
              Cada plataforma tiene una ficha que describe sus principales características:
               variables incluidas, frecuencia de actualización, formato de los datos, alcance geográfico, instituciones involucradas,
                contactos responsables, entre otros.
          </p>
        </div>

        <div>
          <b>4.- ¿Qué es la sección de Bases de Datos?</b>
          <p>
            Esta sección presenta las bases de datos que han sido generadas o gestionadas por la SEH y
             que alimentan las plataformas descritas en el catálogo. 
             Para cada base se informa su tipo, formato, línea de investigación asociada, investigadores responsables,
              fecha de publicación, fecha de actualización, y si corresponde, un identificador DOI.
          </p>
        </div>

        <div>
          <b>5.- ¿Cómo puedo citar una plataforma o base de datos?</b>
          <p>
              Las plataformas y bases de datos que cuentan con un identificador persistente como un DOI tienen disponible la cita sugerida en su ficha.
               Si no aparece, puedes mencionar el nombre del sistema, a SENAMHI como institución desarrolladora, y la fecha de acceso.
                Para mayor certeza, revisa siempre el material incluido en la plataforma o escribe al contacto responsable que aparece en cada ficha.
          </p>
        </div>

        <div>
        <b>6.- ¿Puedo descargar los datos de las plataformas?</b>
          <p>
              Depende del diseño de cada plataforma.
               Algunas permiten la descarga directa, otras ofrecen visualizaciones, y otras conectan con APIs 
               o servicios que requieren configuración o conocimiento técnico.
                Cada ficha indica el tipo de acceso disponible y, cuando corresponde, entrega enlaces y documentación para obtener los datos.
          </p>
        </div>

        <div>
        <b>7.- ¿Cómo puedo contactar al equipo de DataClima?</b>
          <p>
              Depende del diseño de cada plataforma.
               Algunas permiten la descarga directa, otras ofrecen visualizaciones, y otras conectan con APIs 
               o servicios que requieren configuración o conocimiento técnico.
                Cada ficha indica el tipo de acceso disponible y, cuando corresponde, entrega enlaces y documentación para obtener los datos.
          </p>
        </div>

                <div>
          <b>8.- ¿Este portal almacena datos?</b>
          <p>
            No. Este catálogo actúa únicamente como un directorio que redirige
            a plataformas y servicios externos.
          </p>
        </div>

        <div>
          <b>9.- ¿Los datos pertenecen a SENAMHI?</b>
          <p>
            Depende de la plataforma. Cada ficha indica la institución
            responsable y la licencia correspondiente.
          </p>
        </div>

      </Box>
    </Container>
  );
}
