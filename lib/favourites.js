export function getFavourites() {
  return JSON.parse(localStorage.getItem("favourites")) || [];
}

export function addFavourite(item) {
  const stored = getFavourites();

  const exists = stored.some(
    i => i.id === item.id && i.type === item.type
  );

  if (exists) return stored;

  const updated = [...stored, item];
  localStorage.setItem("favourites", JSON.stringify(updated));
  return updated;
}

export function removeFavourite(item) {
  const stored = getFavourites();

  const updated = stored.filter(
    i => !(i.id === item.id && i.type === item.type)
  );

  localStorage.setItem("favourites", JSON.stringify(updated));
  return updated;
}
