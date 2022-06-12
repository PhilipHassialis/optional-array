import { z } from "zod";

const myObj = z
  .object({
    hasConvictions: z.boolean(),
    convictions: z
      .object({
        convictionId: z.string(),
        convictionName: z.string(),
        convictionReason: z.string(),
        convictionFinished: z.boolean(),
      })
      .array(),
  })
  .superRefine((data, ctx) => {
    if (data.hasConvictions && data.convictions.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "convictions is required if hasConvictions is true",
        path: ["convictions"],
      });
    }
    if (!data.hasConvictions && data.convictions.length !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "convictions must be empty if hasConvictions is false",
        path: ["convictions"],
      });
    }
  });

let a = myObj.safeParse({
  hasConvictions: false,
  convictions: [
    {
      convictionId: "123",
      convictionName: "product1",
      convictionReason: "reason1",
      convictionFinished: true,
    },
  ],
});

console.log(a);
