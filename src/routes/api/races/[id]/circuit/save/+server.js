import { edge, edgeQuery } from "$lib/db/client";
import { handleErrors } from "$lib/functions/handlers/errorsHandlers";
import cookie from 'cookie'
import jwt from "jsonwebtoken"

export async function POST({ request, params }) {

    const body = await request.json();
    console.log(body);

    // Check if the race exist in db
    const query = edge.select(edge.Race, race => ({
        owner: {
            id: true
        },
        filter: edge.op(race.joinCode, '=', params.id)
    }))
    let result = await edgeQuery(query);

    // Get user id
    const rawCookies = request.headers.get("cookie");
    if (!rawCookies) return handleErrors(200, "NO_TOKEN", "Veuillez vous connecter pour accéder à cette ressource");

    const cookies = cookie.parse(rawCookies);
    const decoded = jwt.verify(cookies.token, "JWT_SIGN");

    // Check if the user is the race owner 
    if (decoded.userId != result.owner.id) return handleErrors(200, "INCORRECT_USER", "Votre compte n'est pas autorisé à modifier le circuit.")

    const queryUpdate = edge.update(edge.Race, race => ({
        filter: edge.op(race.joinCode, '=', params.id),
        set: {
            circuit: body
        }
    }))

    result = await edgeQuery(queryUpdate);
    console.log("Result :", result);

    return new Response(JSON.stringify({
        pass: true,
        result
    }));
}