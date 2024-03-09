import { PropsWithChildren } from "react";

const FormError = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <div className="rounded-xl p-2 bg-red-200 border border-red-400">
      {children}
    </div>
  );
};

export default FormError;
