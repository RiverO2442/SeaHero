import { useState } from "react";
import { useInterval } from "./useInterval";

export function useLiveTime(options?: Intl.DateTimeFormatOptions): string {
  const [time, setTime] = useState(new Date());
  useInterval(() => setTime(new Date()), 1000);
  return time.toLocaleTimeString("en-US", options ?? {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
