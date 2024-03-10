"use client";

import * as actions from "@/actions";
import FormButton from "@/components/common/FormButton";
import { Button, Textarea } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import FormError from "../common/FormError";

interface Props {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

const CreateCommentForm = ({ postId, parentId, startOpen }: Props) => {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          label="Reply"
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
        />
        <FormError>{formState.errors._form}</FormError>
        <FormButton>Send</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
};

export default CreateCommentForm;
