export const breakpointColumnsObj = {
  default: 4,
  1400: 3,
  1000: 2,
  500: 1,
};

export const breakpointColumns = {
  default: 4,
  1400: 4,
  1050: 3,
  700: 2,
  400: 1,
};

export const blogsBreadPoints = {
  default: 3,
  1050: 2,
  500: 1,
};

export const getStatusStyle = (status: string) => {
  if (status === "completed") {
    return "text-green-500";
  } else if (status === "cancelled") {
    return "text-red-500 font-medium";
  } else {
    return "text-orange-500";
  }
};
