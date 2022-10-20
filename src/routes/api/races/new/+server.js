import { edge, edgeQuery } from "$lib/db/client";
import { handleSchemaErrors } from "$lib/functions/handlers/errorsHandlers";
import { generateJoinCode } from "$lib/functions/utils/race.utils";
import { newRaceSchema } from "$lib/schemas/race";
import cookie from 'cookie'
import jwt from "jsonwebtoken";

export async function POST({ request }) {
    const body = await request.json();

    // Check if data submitted are correct to create a race
    const schema = newRaceSchema.safeParse(body);

    if (!schema.success) {
        return handleSchemaErrors(schema);
    }

    // Get the owner of the race
    const rawCookies = request.headers.get("cookie");
    const token = cookie.parse(rawCookies).token;
    const userId = jwt.verify(token, "JWT_SIGN").userId;

    const joinCode = generateJoinCode();

    const query = edge.insert(edge.Race, {
        autoStart: body.autostart,
        joinCode: joinCode,
        name: body.name,
        date: edge.datetime(new Date(body.date)),
        owner: edge.select(edge.User, user => ({
            filter: edge.op(user.id, '=', edge.uuid(userId))
        }))
    });

    const result = await edgeQuery(query)

    console.log(result);


    return new Response({
        pass: true,
        joinCode
    }, { status: 200 })
}