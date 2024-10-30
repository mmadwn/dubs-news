import PropTypes from "prop-types";

const NewsCardSkeleton = ({ height = "h-48" }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className={`w-full ${height} bg-gray-200 animate-pulse`} />

      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );
};

export default NewsCardSkeleton;

NewsCardSkeleton.propTypes = {
  height: PropTypes.string,
};

