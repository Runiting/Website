export async function GET() {

    return new Response(JSON.stringify({
        pass: true,
        data: "Hello World !"
    }));

}