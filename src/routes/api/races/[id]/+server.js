import { edge, edgeQuery } from "$lib/db/client";

export async function GET({ request, setHeaders, url, params }) {

    const joinCode = params.id;

    const query = edge.select(edge.Race, race => ({
        name: true,
        date: true,
        runners: true,
        owner: {
            fullname: true,
        },
        circuit: true,
        joinCode: true,
        filter: edge.op(race.joinCode, '=', joinCode),
    }));
    const result = await edgeQuery(query);

    return new Response(JSON.stringify({
        pass: true,
        data: result
    }));
}