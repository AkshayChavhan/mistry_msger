import {z} from "zod";



export const messageSchema = z.object({
    content: z
    .string()
    .min(10,{message: "Content must be at least of 10 character."})
    .max(300,{message: "Content must be at no longer than of 300 character."})
})