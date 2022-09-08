import { z } from 'zod';

export const newRaceSchema = z.object({
    name: z
        .string({ required_error: 'A name for this race must be provided' })
        .max('32'),
    autostart: z
        .boolean({ required_error: 'You need to provide if the race is started automatically or not' }),
    // date: z
    //     .date({ required_error: 'You need to provide the date of the race', invalid_type_error: "That's not a date!", })
    //     .min(new Date())
});
