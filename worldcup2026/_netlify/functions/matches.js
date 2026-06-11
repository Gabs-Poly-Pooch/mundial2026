const API = 'https://api.football-data.org/v4';

export default async (req, context) => {
  const url = new URL(req.url);
  const path = url.searchParams.get('path') || '/competitions/WC/matches';
  const key  = url.searchParams.get('key') || '';

  if (!key) {
    return new Response(JSON.stringify({ error: 'No API key provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    const res = await fetch(`${API}${path}`, {
      headers: { 'X-Auth-Token': key }
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

export const config = { path: '/api/matches' };
