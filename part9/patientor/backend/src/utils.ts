import { Diagnosis } from "../src/types";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};
