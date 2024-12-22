import { z } from "zod";

// Create Article schema for strings
export const createArticleSchema = z.object({
    title: z.string({
        required_error: "title is required",
        invalid_type_error: "title should be of type string"
    }).min(2, { message: "title should be at least 2 characters long"})
    .max(200, { message: "title should be less than 200 characters"}),
    description: z.string({
        required_error: "description is required",
        invalid_type_error: "description should be of type string"
    }).min(10, "description should be be at least 10 characters long"),
});

// Create Register schema for strings
export const createRegisterSchema = z.object({
    username: z.string({
        required_error: "username is required",
        invalid_type_error: "username should be of type string"
    }).min(2, "username should be at least 2 characters long")
        .max(100, "username should be less than 100 characters"), //.optional(),
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "email should be of type string",
    }).email(),
    password: z.string({
        required_error: "password is required",
        invalid_type_error: "password should be of type string",
        }).min(6),
});


// Login schema for strings
export const loginSchema = z.object({
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "email should be of type string",
    }).email(),
    password: z.string({
        required_error: "password is required",
        invalid_type_error: "password should be of type string",
        }).min(6),
});

// Create Comment schema for strings
export const createCommentSchema = z.object({
    text: z.string({
        required_error: "Comment is required",
        invalid_type_error: "Comment should be of type string"
    }).min(2, { message: "Comment should be at least 2 characters long"})
    .max(500, { message: "Comment should be less than 500 characters"}),
    articleId: z.number(),
});

// Update User Profile schema for strings
export const updateUserSchema = z.object({
    username: z.string({
        required_error: "username is required",
        invalid_type_error: "username should be of type string"
    }).min(2, "username should be at least 2 characters long")
        .max(100, "username should be less than 100 characters").optional(),
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "email should be of type string",
    }).email().optional(),
    password: z.string({
        required_error: "password is required",
        invalid_type_error: "password should be of type string",
        }).min(6).optional(),
});
