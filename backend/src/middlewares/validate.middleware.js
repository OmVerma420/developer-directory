import { ApiError } from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    // Convert FormData values (req.body) into correct types
    const parsedBody = { ...req.body };

    // Zod expects experience to be a number
    if (parsedBody.experience) {
      parsedBody.experience = Number(parsedBody.experience);
    }

    // Zod expects techStack as string or array; FormData gives string
    if (typeof parsedBody.techStack === "string") {
      parsedBody.techStack = parsedBody.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const result = schema.safeParse(parsedBody);

    if (!result.success) {
      const message = result.error.errors[0].message;
      throw new ApiError(400, message);
    }

    // store validated data
    req.validatedData = result.data;
    next();

  } catch (err) {
    next(err);
  }
};
