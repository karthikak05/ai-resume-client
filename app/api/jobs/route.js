export async function GET(req, res) {
    try {
      const url = req.url;
      const queryParams = extractQueryParams(url);
      const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`;
      const queryString = new URLSearchParams();
  
      for (const key in queryParams) {
        const value = queryParams[key]
        if (value) {
          console.log(key,value)
          queryString.append(key, value);
        }
      }
      let finalUrl = baseUrl;
      if( queryParams ){
        finalUrl +="?" + queryString
      }

      console.log(`final:${finalUrl}`)
      const response = await fetch(finalUrl);
      const json = await response.json()
      return new Response(JSON.stringify(json), { status: 200 });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }
  }
  
  function extractQueryParams(url) {
    const queryString = url.split('?')[1];
  
    if (!queryString) return {};
  
    const params = queryString.split('&');
  
    const queryParams = {};
      params.forEach(param => {
      const [key, value] = param.split('=');
      if (key && value) {
        queryParams[key] = decodeURIComponent(value); // Decode the value (in case it's URL encoded)
      }
    });
  
    return queryParams;
  }
  