import { motion } from "framer-motion";

const getImageSrc = (image) => {
  if (!image) return null;
  if (image.startsWith("data:image")) return image;
  return `data:image/jpeg;base64,${image}`;
};

export default function EventCard({
  event,
  footer, // 👈 actions injected from outside
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg hover:shadow-blue-500/10 overflow-hidden"
    >
      {/* IMAGE */}
      {event.image && (
        <img
          src={getImageSrc(event.image)}
          alt={event.title}
          className="h-40 w-full object-cover rounded-t-xl"
        />
      )}

      <div className="p-5 space-y-2">
        <h2 className="text-lg font-semibold">{event.title}</h2>

        <p className="text-sm text-gray-400">
          {event.description}
        </p>

        <div className="text-sm text-gray-300 space-y-1">
          <p>
            <span className="text-gray-500">Department:</span>{" "}
            {event.department}
          </p>
          <p>
            <span className="text-gray-500">Venue:</span> {event.venue}
          </p>
          <p>
            <span className="text-gray-500">Date:</span>{" "}
            {event.eventDate} | {event.eventTime}
          </p>
        </div>

        {/* 👇 ACTIONS SLOT */}
        <div className="pt-4">
          {footer}
        </div>
      </div>
    </motion.div>
  );
}
