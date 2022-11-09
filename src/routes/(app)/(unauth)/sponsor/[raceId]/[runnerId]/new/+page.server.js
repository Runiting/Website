import { edge, edgeQuery } from "$lib/db/client";

export async function load({ params }) {

    const raceCode = params.raceId;
    const runnerId = params.runnerId;

    console.log("Runner : ", runnerId, " for race : ", raceCode);

    const query = edge.select(edge.Race, race => ({
        id: true,
        joinCode: true,
        name: true,
        date: true,
        owner: {
            fullname: true,
        },
        runner: edge.select(edge.User, user => ({
            fullname: true,
            filter: edge.op(user.id, "=", edge.uuid(runnerId))
        })),
        isIn: edge.op(edge.select(edge.User, user => ({
            filter: edge.op(user.id, "=", edge.uuid(runnerId))
        })), 'in', race.runners),
        filter: edge.op(race.joinCode, '=', raceCode),
    }))

    return { race: await edgeQuery(query) };
}