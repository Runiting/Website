import { edge, edgeQuery } from "$lib/db/client";

export async function GET({ request, setHeaders, url }) {

    const query = edge.select(edge.Race, ({
        name: true,
        date: true,
        runners: true,
        owner: {
            fullname: true,
        },
        joinCode: true,
    }));
    const result = await edgeQuery(query);

    return new Response(JSON.stringify({
        pass: true,
        data: result
    }));

}