import { useState, useCallback } from "react";

type RuleFn<T, K extends keyof T> = (value: T[K], all: T) => string | undefined;
type Rules<T> = { [K in keyof T]?: RuleFn<T, K> };

export function useFormValidation<T extends Record<string, unknown>>(rules: Rules<T>) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = useCallback(
    (values: T): boolean => {
      const errs: Partial<Record<keyof T, string>> = {};
      for (const key in rules) {
        const rule = rules[key];
        if (rule) {
          const msg = rule(values[key] as T[typeof key], values);
          if (msg) errs[key] = msg;
        }
      }
      setErrors(errs);
      return Object.keys(errs).length === 0;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const clearError = useCallback((field: keyof T) => {
    setErrors((e) => { const next = { ...e }; delete next[field]; return next; });
  }, []);

  return { errors, validate, clearError, setErrors };
}
