export async function POST(req,res){
    try {
        const bodyText = await req.text();
        const JD = JSON.parse(bodyText); 
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/generate_resume`
        const response = await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(JD), 
        });
        const json = await response.json()
        return new Response(JSON.stringify(json), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }
}