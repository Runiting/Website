import { handleSchemaErrors } from "$lib/functions/handlers/errorsHandlers";
import { generateJoinCode } from "$lib/functions/utils/race.utils";
import { newRaceSchema } from "$lib/schemas/race";
import cookie from 'cookie'
import jwt from "jsonwebtoken";

export async function POST({ request, setHeaders, url }) {
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
    console.log(joinCode);


    return new Response({
        pass: true,
        joinCode
    }, { status: 200 })
}