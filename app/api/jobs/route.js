export async function GET(req, res) {
    try {
      const skills = req.searchParams;
      const baseUrl = 'http://0.0.0.0:8080/jobs?skill=react&experience=1&location=Chennai';
      const queryString = new URLSearchParams();
  
      // for (const key in queryParams) {
      //   if (queryParams[key]) {
      //     queryString.append(key, queryParams[key]);
      //   }
      //
      const response = await fetch(baseUrl);
      const json = await response.json()
      return new Response(JSON.stringify(json), { status: 200 });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }
  }
  