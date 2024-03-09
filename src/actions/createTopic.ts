"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(55)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10).max(255),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string;
  };
}

export async function createTopic(
  formsState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const session = await auth();
  if (!session || !session.user)
    return {
      errors: {
        _form: "You must be signed signed in to create a topic.",
      },
    };

  const validationResult = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!validationResult.success)
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };

  let topic: Topic;
  try {
    const { name, description } = validationResult.data;
    topic = await db.topic.create({
      data: {
        slug: name,
        description,
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
        _form: "Creating topic failed",
      },
    };
  }

  revalidatePath("/");
  redirect(paths.showTopic(topic.slug));
}
