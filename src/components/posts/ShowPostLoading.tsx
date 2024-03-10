import { Skeleton } from "@nextui-org/react";

const ShowPostLoading = () => {
  return (
    <div className="m-4">
      <div className="my-2">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="p-4 border rounded-sm space-y-2">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-28" />
      </div>
    </div>
  );
};

export default ShowPostLoading;
