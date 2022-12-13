import { z } from "zod";

export const Game = z.object({
    id: z.string(),
    name: z.string().min(1, "Vul iets in."),
    shortName: z.string().min(1, "Vul iets in."),
    scoreType: z.string().optional()
});