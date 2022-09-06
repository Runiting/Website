import { notifications } from '$lib/stores/app.stores'
import { get } from 'svelte/store'

export const newNotification = ({
    type = "info",
    title = "Nouvelle Notification",
    description = "Description",
    uuid = Date.now(),
}, exp) => {

    notifications.set([...get(notifications), { type, title, description, uuid, exp }])
}

export const deleteNotification = (uuid) => {
    notifications.set(get(notifications).filter(n => n.uuid !== uuid))
}