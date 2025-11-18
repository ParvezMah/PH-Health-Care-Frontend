"use client";
// 1️⃣ Setup & Imports
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";

// 2️⃣ Initial Props
interface SearchFilterProps {
  placeholder?: string;
  paramName?: string;
}

const SearchFilter = ({
  placeholder = "Search...",
  paramName = "searchTerm",
}: SearchFilterProps) => {
  const router = useRouter();
  // 3️⃣ Get Router + startTransition
  const [isPending, startTransition] = useTransition();

  // 4️⃣ Read URL Parameters
  const searchParams = useSearchParams();

  // 5️⃣ Set Input Initial Value
  const [value, setValue] = useState(searchParams.get(paramName) || "");

  // 6️⃣ Debounce
  const debouncedValue = useDebounce(value, 500);

  // 7️⃣ Main Effect: Sync Search → URL
  useEffect(() => {
    // Step A: Copy existing params
    const params = new URLSearchParams(searchParams.toString());

    // Step B: Check initial value
    const initialValue = searchParams.get(paramName) || "";

    if (debouncedValue === initialValue) {
      return;
    }

    if (debouncedValue) {
      // Step C: If user typed something
      params.set(paramName, debouncedValue); // ?searchTerm=debouncedValue
      params.set("page", "1"); // reset to first page on search
    } else {
      // Step D: If input cleared
      params.delete(paramName); // remove searchTerm param
      params.delete("page"); // reset to first page on search clear
    }

    // Step E: Push URL (without blocking UI)
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [debouncedValue, paramName, router, searchParams]);

  return (
    // 8️⃣ Render the UI
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isPending}
      />
    </div>
  );
};

export default SearchFilter;