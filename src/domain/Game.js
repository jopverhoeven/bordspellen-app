import { z } from "zod";

export const Game = z.object({
    name: z.string().min(1, "Vul iets in."),
    shortName: z.string().length(1, "Maximaal 1 emoji of letter."),
    scoreType: z.string().optional()
});