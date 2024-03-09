"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(3).max(55),
  content: z.string().min(10).max(500),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string;
  };
}

export async function createPost(
  slug: string,
  formsState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const session = await auth();
  if (!session || !session.user)
    return {
      errors: {
        _form: "You must be signed signed in to create a post.",
      },
    };

  const validationResult = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  if (!validationResult.success)
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };

  const topic = await db.topic.findFirst({ where: { slug } });
  if (!topic)
    return {
      errors: {
        _form: "Cannot find topic with the given slug",
      },
    };

  let post: Post;
  try {
    const { title, content } = validationResult.data;
    post = await db.post.create({
      data: {
        title,
        content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      return {
        errors: {
          _form: error.message,
        },
      };
    return {
      errors: {
        _form: "Creating post failed",
      },
    };
  }

  revalidatePath(paths.showTopic(slug));
  redirect(paths.showPost(slug, post.id.toString()));
}
