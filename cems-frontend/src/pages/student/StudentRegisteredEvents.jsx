import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getStudentRegisteredEvents } from "../../services/ApiService";
import EventCard from "../../components/EventCard";

export default function StudentRegisteredEvents() {
  const studentId = localStorage.getItem("userId");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await getStudentRegisteredEvents(studentId);
        setEvents(res.data);
      } catch {
        toast.error("Failed to load registered events");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [studentId]);

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">My Registered Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-400">
          You have not registered for any events
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              footer={
                <span className="inline-block text-green-400 text-sm font-medium">
                  ✔ Registered
                </span>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
