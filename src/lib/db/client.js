import { createClient } from "edgedb";
import eEdge from "$lib/db/edge";

export const edge = eEdge;
export const edgeClient = createClient({
    database: "Runiting",
});

export const edgeQuery = async (query) => {
    return await query.run(edgeClient);
}