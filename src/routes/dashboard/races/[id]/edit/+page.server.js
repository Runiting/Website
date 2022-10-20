import { edge, edgeQuery } from "$lib/db/client";

export async function load({ params }) {

    const raceCode = params.id;

    const query = edge.select(edge.Race, race => ({
        name: true,
        date: true,
        runners: true,
        owner: {
            fullname: true,
        },
        circuit: true,
        joinCode: true,
        filter: edge.op(race.joinCode, '=', raceCode),
    }))

    return { race: await edgeQuery(query) };
}