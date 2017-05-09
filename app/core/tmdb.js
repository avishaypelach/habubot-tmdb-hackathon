const TMDB_API_URL   = process.env.TMDB_API_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export default class TMDB {
  static get(path) {
    const baseUrl    = `${TMDB_API_URL}${path}`;
    const separator  = path.includes('?') ? '&' : '?';
    const tokenParam = `api_key=${TMDB_API_TOKEN}`;
    const url        = baseUrl + separator + tokenParam;

    return fetch(url)
      .then((res) => res.json());
  }
}
