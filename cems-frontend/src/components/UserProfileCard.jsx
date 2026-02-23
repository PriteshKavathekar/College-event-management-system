export default function UserProfileCard() {
  const name = localStorage.getItem("userName");
  const department = localStorage.getItem("department");
  const role = localStorage.getItem("role");

  if (!name) return null;

  return (
    <div className="mb-8 pb-6 border-b border-gray-700">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className="h-11 w-11 rounded-full bg-gray-700
                        flex items-center justify-center
                        text-base font-semibold text-gray-100"
        >
          {name.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <div className="leading-tight">
          <p className="font-semibold text-gray-100">{name}</p>

          {department && <p className="text-sm text-gray-400">{department}</p>}

          {role && (
            <p className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">
              {role}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
