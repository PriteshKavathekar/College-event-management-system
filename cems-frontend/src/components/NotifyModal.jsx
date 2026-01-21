import { useState } from "react";
import { toast } from "react-toastify";
import {
  notifyRegisteredStudents,
  notifyAllStudents,
} from "../services/ApiService";

export default function NotifyModal({ event, onClose }) {
  const defaultMessage = `Event: ${event.title}
Department: ${event.department}
Date: ${event.eventDate}
Time: ${event.eventTime}
Venue: ${event.venue}

${event.description}`;

  const [mode, setMode] = useState("REGISTERED");
  const [subject, setSubject] = useState("Event Notification");
  const [message, setMessage] = useState(defaultMessage);
  const [sending, setSending] = useState(false);

  const handleModeChange = (value) => {
    setMode(value);
    setSubject("Event Notification");
    setMessage(defaultMessage);
  };

  const handleSend = async () => {
    if (!subject || !message) {
      toast.error("Subject and message are required");
      return;
    }

    try {
      setSending(true);

      if (mode === "REGISTERED") {
        await notifyRegisteredStudents(event.id, { subject, message });
      }

      if (mode === "ALL") {
        await notifyAllStudents(event.id, { subject, message });
      }

      toast.success("Notification sent successfully");
      onClose();
    } catch {
      toast.error("Failed to send notification");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg border border-gray-800">
        <h2 className="text-xl font-semibold mb-5">
          Notify Students — {event.title}
        </h2>

        {/* MODE */}
        <div className="space-y-2 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={mode === "REGISTERED"}
              onChange={() => handleModeChange("REGISTERED")}
            />
            Registered Students
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={mode === "ALL"}
              onChange={() => handleModeChange("ALL")}
            />
            All Students
          </label>
        </div>

        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
        />

        <textarea
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 rounded">
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
