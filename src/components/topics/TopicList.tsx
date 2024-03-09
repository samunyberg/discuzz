import { db } from "@/db";
import paths from "@/paths";
import { Chip } from "@nextui-org/react";
import { Topic } from "@prisma/client";
import Link from "next/link";

const TopicList = async () => {
  const topics: Topic[] = await db.topic.findMany();

  const renderedTopics = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.showTopic(topic.slug)}>
          <Chip color="warning" variant="solid">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    );
  });

  return <div className="flex flex-row flex-wrap gap-2">{renderedTopics}</div>;
};

export default TopicList;
