export async function loadCatalogo() {
  const url = `${import.meta.env.BASE_URL}catalogo.json`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`No se pudo cargar ${url}`);
  return await r.json();
}
