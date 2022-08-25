import { signUpSchema } from "$lib/schemas/auth.js";
import bcrypt from "bcryptjs";
import { handleSchemaErrors, handleErrors } from "$lib/functions/handlers/errorsHandlers.js";
import { edge, edgeQuery } from "$lib/db/client.js";

export async function POST({ request }) {
    const body = await request.json();

    const schema = signUpSchema.safeParse(body);

    if (!schema.success) {
        return handleSchemaErrors(schema);
    }

    const hashedPassword = bcrypt.hashSync(body.password, 10);

    const newUser = await edge.insert(edge.User, {
        email: body.email,
        password: hashedPassword,
        phone: body.phone,

        firstname: body.firstname,
        lastname: body.lastname,

        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const query = await edgeQuery(edge.select(newUser, () => ({
        id: true,
        email: true,
        fullname: true,
    }))).then((data) => {
        return {
            exist: false,
            data
        }
    }).catch(() => {
        return {
            exist: true,
        }
    });

    if (query.exist) {
        return handleErrors(200, 'EMAIL_EXIST', "L'adresse email est déjà associée à un compte");
    }


    return new Response(JSON.stringify({
        status: 200,
        body: {
            pass: true,
            data: query
        }
    }))
}