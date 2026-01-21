import { useState } from "react";
import { toast } from "react-toastify";
import { notifySingleStudent } from "../services/ApiService";

export default function NotifySingleStudentModal({ student, onClose }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!subject || !message) {
      toast.error("Subject and message are required");
      return;
    }

    try {
      setSending(true);

      await notifySingleStudent(student.id, {
        subject,
        message,
      });

      toast.success(`Email sent to ${student.name}`);
      onClose();
    } catch (err) {
      toast.error("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg border border-gray-800">
        <h2 className="text-xl font-semibold mb-1">
          Send Email to {student.name}
        </h2>
        <p className="text-sm text-gray-400 mb-4">{student.email}</p>

        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
        />

        <textarea
          rows={6}
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            {sending ? "Sending..." : "Send Email"}
          </button>
        </div>
      </div>
    </div>
  );
}
