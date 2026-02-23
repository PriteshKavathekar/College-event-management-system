import { useState } from "react";
import { toast } from "react-toastify";
import { createEvent } from "../../services/ApiService";

export default function AddEvent() {
  const [image, setImage] = useState(null);
  const [event, setEvent] = useState({
    title: "",
    description: "",
    department: "",
    venue: "",
    eventDate: "",
    eventTime: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("event", JSON.stringify(event));

    if (image) {
      formData.append("image", image);
    }

    await createEvent(formData);

    toast.success("Event created successfully");

    setEvent({
      title: "",
      description: "",
      department: "",
      venue: "",
      eventDate: "",
      eventTime: "",
    });
    setImage(null);
  } catch (err) {
    console.error(err);
    toast.error("Failed to create event");
  }
};


  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">
        Add Event
      </h1>

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
            <label className="block text-sm mb-1 text-gray-400">
              Venue
            </label>
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
            Event Image (optional)
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-sm text-gray-400"
          />
        </div>

        {/* SUBMIT */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
