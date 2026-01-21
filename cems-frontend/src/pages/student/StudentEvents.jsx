import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getEvents,
  registerToEvent,
  getStudentRegisteredEvents,
} from "../../services/ApiService";
import EventCard from "../../components/EventCard";

export default function StudentEvents() {
  const studentId = localStorage.getItem("userId");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // LOAD EVENTS (EXCLUDE REGISTERED)
  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsRes, regRes] = await Promise.all([
          getEvents(),
          getStudentRegisteredEvents(studentId),
        ]);

        const registeredIds = regRes.data.map((e) => e.id);

        const availableEvents = eventsRes.data.filter(
          (e) => !registeredIds.includes(e.id),
        );

        setEvents(availableEvents);
      } catch {
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [studentId]);

  // REGISTER EVENT
  const handleRegister = async (event) => {
    const confirm = window.confirm(
      `Do you want to register for "${event.title}"?`,
    );
    if (!confirm) return;

    try {
      await registerToEvent(event.id, studentId);
      toast.success("Registered successfully 🎉");

      // REMOVE FROM AVAILABLE EVENTS
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
    } catch {
      toast.error("Already registered or failed");
    }
  };

  const filteredEvents = events.filter((event) => {
    const q = search.toLowerCase();

    return (
      event.title?.toLowerCase().includes(q) ||
      event.description?.toLowerCase().includes(q) ||
      event.department?.toLowerCase().includes(q) ||
      event.venue?.toLowerCase().includes(q) ||
      event.eventDate?.toLowerCase().includes(q) ||
      event.eventTime?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return <p className="text-gray-400">Loading events...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Available Events</h1>

      {/* 🔍 SEARCH BAR */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search events by title, department, venue, date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 rounded-lg bg-gray-800
               border border-gray-700 text-gray-100
               placeholder-gray-400 focus:outline-none
               focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {events.length === 0 ? (
        <p className="text-gray-400">No available events</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              footer={
                <button
                  onClick={() => handleRegister(event)}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium"
                >
                  Register
                </button>
              }
            />
          ))}
        </div>
      )}

      {/*NO SEARCH RESULTS */}
      {filteredEvents.length === 0 && (
        <p className="text-gray-400 mt-10">No events match your search</p>
      )}
    </div>
  );
}
