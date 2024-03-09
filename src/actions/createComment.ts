"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string;
  };
  success?: boolean;
}

export async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: "You must sign in to do this.",
      },
    };
  }

  const validationResult = createCommentSchema.safeParse({
    content: formData.get("content"),
  });
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    await db.comment.create({
      data: {
        content: validationResult.data.content,
        postId: postId,
        parentId: parentId,
        userId: session.user.id,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: err.message,
        },
      };
    } else {
      return {
        errors: {
          _form: "Something went wrong",
        },
      };
    }
  }

  const topic = await db.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });
  if (!topic) {
    return {
      errors: {
        _form: "Failed to revalidate topic",
      },
    };
  }

  revalidatePath(paths.showPost(topic.slug, postId));
  return {
    errors: {},
    success: true,
  };
}
