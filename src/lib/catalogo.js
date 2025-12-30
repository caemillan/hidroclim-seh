export async function loadCatalogo() {
  const r = await fetch("/catalogo.json");
  if (!r.ok) throw new Error("No se pudo cargar catalogo.json");
  return await r.json();
}