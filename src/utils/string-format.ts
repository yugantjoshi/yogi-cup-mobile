export const getInitials = (name: string) => {
    const val =name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return val;
}