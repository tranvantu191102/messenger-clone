import { FC, ReactNode } from "react";

interface SkeletonProps {
  className: string;
}

const Skeleton: FC<SkeletonProps> = ({ className }) => {
  return <div className={`${className} animate-pulse bg-gray-200`}></div>;
};

export default Skeleton;
