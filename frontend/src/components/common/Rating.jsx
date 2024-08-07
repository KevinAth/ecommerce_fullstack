import { StarIcon } from "@heroicons/react/20/solid";
export function Rating({ estrellas }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div>
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                aria-hidden="true"
                className={classNames(
                  estrellas > rating ? "text-gray-900" : "text-gray-200",
                  "h-5 w-5 flex-shrink-0"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
