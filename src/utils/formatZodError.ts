export const formatZodError = (err) => {
  if (err?.length) {
    const formattedErrors = err?.map((err) => {
      const path = err.path.join(".");
      return `${path}: ${err.message}`;
    });
    return formattedErrors?.join(", ");
  }
  return null;
};
