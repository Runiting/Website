import { loginSchema } from "$lib/schemas/auth.js";
import bcrypt from "bcryptjs";
import { handleSchemaErrors, handleErrors } from "$lib/functions/handlers/errorsHandlers.js";
import { edge, edgeQuery } from "$lib/db/client.js";
import jwt from "jsonwebtoken";

export async function POST({ request, setHeaders, url }) {
    const body = await request.json();

    // Check if information submitted are correct
    const schema = loginSchema.safeParse(body);

    if (!schema.success) {
        console.log(schema);
        return handleSchemaErrors(schema);
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
        return handleErrors(200, "INVALID_CREDENTIALS", "Email address and password don't correspond to a valid account");
    }

    // Create JWT token for the authenticated user
    const token = jwt.sign({
        userId: user.id,
    }, "JWT_SIGN", { expiresIn: '1h' })

    setHeaders({
        "set-cookie": [`token=${token}; HttpOnly; Max-Age=${3600}; Path=/`],
    })

    return new Response(JSON.stringify({
        pass: "true",
        token,
        user
    }))
}