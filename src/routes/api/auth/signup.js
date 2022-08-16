import {signUpSchema} from "$lib/schemas/auth.js";
import bcrypt from "bcryptjs";

import {handleSchemaErrors} from "$lib/functions/handlers/errorsHandlers.js";


export async function POST({request}) {
    const body = await request.json();

    const schema = signUpSchema.safeParse(body);

    if (!schema.success){
        return handleSchemaErrors(schema);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);





    return {
        status: 200,
        body: {
            pass: true,

        }
    }
}