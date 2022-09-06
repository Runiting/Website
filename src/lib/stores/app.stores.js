import { writable } from "svelte/store";

export let notifications = writable([{
    type: 'success',
    title: 'Account created !',
    description:
        'Your account has been successfully created. You will be redirect in few seconds',
    exp: 5000
}]);