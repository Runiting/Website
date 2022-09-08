import { createClient } from "edgedb";
import eEdge from "$lib/db/edge";

export const edge = eEdge;
export const edgeClient = createClient({
    database: "dev",
});

export const edgeQuery = async (query) => {
    return await query.run(edgeClient);
}