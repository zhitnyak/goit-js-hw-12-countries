export default function fetchCountries(searchQuery) {
  const url = `https://restcountries.com/v2/name/${searchQuery}`;

  return fetch(url)
    .then(res => res.json())
    .catch(error => error);
}
