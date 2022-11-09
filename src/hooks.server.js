import { parse } from 'cookie'

export const handle = async ({ event, resolve }) => {

    // try {
    //     const cookies = parse(event.request.headers.get('cookie'));
    //     const accessToken = cookies['token'];
    //     console.log(accessToken)
    // } catch (error) {
    //     console.log(error)
    // }


    const response = await resolve(event);

    // if (event.routeId.includes("api")) {
    //     response.headers.set('Access-Control-Allow-Credentials', '*');
    //     response.headers.set('Access-Control-Allow-Origin', '*');
    // }

    return response;
}