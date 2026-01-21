import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getEvents,
  deleteEvent,
  getEventRegisteredStudents,
} from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NotifyModal from "../../components/NotifyModal";

export default function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const navigate = useNavigate();

  // LOAD EVENTS + REGISTRATION COUNTS
  const loadEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);

      const countMap = {};

      await Promise.all(
        res.data.map(async (event) => {
          const studentsRes = await getEventRegisteredStudents(event.id);
          countMap[event.id] = studentsRes.data.length;
        })
      );

      setCounts(countMap);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await deleteEvent(id);
      toast.success("Event deleted");
      loadEvents();
    } catch {
      toast.error("Failed to delete event");
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading events...</p>;
  }

  if (events.length === 0) {
    return <p className="text-gray-400">No events found</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">All Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg hover:shadow-blue-500/10 overflow-hidden"
          >
            {/* IMAGE */}
            {event.image && (
              <img
                src={`data:image/*;base64,${event.image}`}
                alt={event.title}
                className="h-40 w-full object-cover rounded-t-xl"
              />
            )}

            <div className="p-5 space-y-2">
              <h2 className="text-lg font-semibold">{event.title}</h2>

              <p className="text-sm text-gray-400 line-clamp-2">
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

              <div className="mt-3 text-sm text-gray-400 flex items-center gap-2">
                <span>👥</span>
                <span>{counts[event.id] ?? 0} Registrations</span>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() =>
                    navigate(`/coordinator/events/${event.id}/students`)
                  }
                  className="text-blue-400 hover:text-blue-500 text-sm font-medium"
                >
                  View Students
                </button>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="text-purple-400 hover:text-purple-500 text-sm"
                  >
                    Notify
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/coordinator/events/${event.id}/edit`)
                    }
                    className="text-yellow-400 hover:text-yellow-500 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-400 hover:text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* NOTIFICATION MODAL */}
      {selectedEvent && (
        <NotifyModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
