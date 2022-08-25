import { loginSchema } from "$lib/schemas/auth.js";
import bcrypt from "bcryptjs";
// import { handleSchemaErrors, handleErrors } from "$lib/functions/handlers/errorsHandlers.js";
import { edge, edgeQuery } from "$lib/db/client.js";
import jwt from "jsonwebtoken";

export async function POST({ request, setHeaders, url }) {
    const body = await request.json();

    // Check if information submitted are correct
    const schema = loginSchema.safeParse(body);

    if (!schema.success) {
        console.log(schema);
        // return handleSchemaErrors(schema);
    }

    // Check if a user exist in the database
    const query = await edge.select(edge.User, user => ({
        id: true,
        email: true,
        password: true,
        fullname: true,
        role: true,
        filter: edge.op(user.email, '=', body.email)
    }))

    const user = await edgeQuery(query)
    console.log(user);

    // Check if password submitted is correct
    const result = await bcrypt.compare(body.password, user.password);

    if (!result) {
        return new Response(JSON.stringify({
            status: 200,
            body: {
                pass: false,
                // data: query
            }
        }))
    }

    // Create JWT token for the authenticated user
    const token = jwt.sign({
        data: {
            userId: user.id,
        },
        exp: "1h",
    }, "JWT_SIGN")

    setHeaders({
        "set-cookie": [`token=${token}; HttpOnly; Max-Age=${3600}; Path=/`],
    })

    const response = new Response();
    response.status = 200;
    response.body = JSON.stringify({
        token,
        user
    });
}