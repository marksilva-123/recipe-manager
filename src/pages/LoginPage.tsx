import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/auth.hooks";

export default function LoginPage() {
  const [name, setName] = useState("");
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const from = (location.state as { from?: string } | null)?.from ?? "/saved";

  if (isLoggedIn) return <Navigate to={from} replace />;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;
    login(name);
    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-sm mx-auto card bg-base-100 shadow">
      <form onSubmit={handleSubmit} className="card-body space-y-3">
        <h2 className="card-title">Sign in</h2>
        <p className="text-sm text-base-content/70">
          Your saved collection is private. Enter a display name to continue.
        </p>
        <label className="form-control">
          <span className="label-text">Display name</span>
          <input
            ref={nameRef}
            type="text"
            className="input input-bordered"
            placeholder="e.g. Jenny"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
        <p className="text-xs text-base-content/50">
          No password, because there is no server. This demonstrates route guards, not security.
        </p>
      </form>
    </div>
  );
}
