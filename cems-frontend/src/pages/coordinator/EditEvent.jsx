import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEvents, updateEvent } from "../../services/ApiService";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [event, setEvent] = useState({
    title: "",
    description: "",
    department: "",
    venue: "",
    eventDate: "",
    eventTime: "",
  });

  // LOAD EVENT DATA
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await getEvents();
        const found = res.data.find((e) => e.id === Number(id));

        if (!found) {
          toast.error("Event not found");
          navigate("/coordinator/events");
          return;
        }

        setEvent({
          title: found.title,
          description: found.description,
          department: found.department,
          venue: found.venue,
          eventDate: found.eventDate,
          eventTime: found.eventTime,
        });
      } catch {
        toast.error("Failed to load event");
      }
    };

    loadEvent();
  }, [id, navigate]);

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE EVENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // IMPORTANT: backend expects STRING, not Blob
      formData.append("event", JSON.stringify(event));

      if (image) {
        formData.append("image", image);
      }

      await updateEvent(id, formData);

      toast.success("Event updated successfully");
      navigate("/coordinator/events");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update event");
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Event</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 rounded-xl p-8 space-y-6"
      >
        {/* TITLE */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">
            Description
          </label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            rows="4"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1 text-gray-400">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={event.department}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-400">Venue</label>
            <input
              type="text"
              name="venue"
              value={event.venue}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-400">
              Event Date
            </label>
            <input
              type="date"
              name="eventDate"
              value={event.eventDate}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-400">
              Event Time
            </label>
            <input
              type="time"
              name="eventTime"
              value={event.eventTime}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
            />
          </div>
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">
            Change Image (optional)
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-sm text-gray-400"
          />
        </div>

        {/* SUBMIT */}
        <div className="pt-4 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium"
          >
            Update Event
          </button>

          <button
            type="button"
            onClick={() => navigate("/coordinator/events")}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
