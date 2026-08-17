export type CompilerAvailability =
  | { status: "unconfigured"; canExecute: false; message: string }
  | { status: "available"; canExecute: true; endpoint: string };

export function getCompilerAvailability(endpoint?: string): CompilerAvailability {
  if (!endpoint) {
    return {
      status: "unconfigured",
      canExecute: false,
      message: "The safe KoshLang execution service has not been configured."
    };
  }

  return { status: "available", canExecute: true, endpoint };
}
