import { z } from "zod";

export const Game = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Vul iets in."),
    shortName: z.string().min(1, "Vul iets in."),
    scoreType: z.string().optional()
});