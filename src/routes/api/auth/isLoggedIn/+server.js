import { handleErrors } from '$lib/functions/handlers/errorsHandlers';
import cookie from 'cookie'
import jwt from "jsonwebtoken"

export async function POST({ request, setHeaders, url }) {
    const rawCookies = request.headers.get("cookie");

    if (!rawCookies) {
        return handleErrors(200, "NO_TOKEN", "Veuillez vous connecter pour accéder à cette ressource");
    }

    const cookies = cookie.parse(rawCookies);

    if (!cookies.token) {
        return handleErrors(200, "NO_TOKEN", "Veuillez vous connecter pour accéder à cette ressource");
    }

    const decoded = jwt.verify(cookies.token, "JWT_SIGN");

    if (!decoded) {
        return handleErrors(200, "INVALID_TOKEN", "Le token est invalide");
    }

    return new Response(JSON.stringify({
        pass: true,
        status: "User logged in",
    }));
}