import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  term: string;
  onChange: (term: string) => void;
}

export default function SearchBar({ term, onChange }: SearchBarProps) {
  const [value, setValue] = useState(term);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => onChange(value.trim()), 300);
    return () => window.clearTimeout(timeout);
  }, [value, onChange]);

  return (
    <input
      ref={inputRef}
      type="search"
      className="input input-bordered w-full"
      placeholder="Search meals"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
