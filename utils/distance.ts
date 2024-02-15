const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const haversine = (point1: number[], point2: number[]) => {
  const lat1 = point1[1];
  const lon1 = point1[0];
  const lat2 = point2[1];
  const lon2 = point2[0];
  const R = 6371; // Bán kính Trái Đất trong kilômét

  // Chuyển đổi tọa độ từ độ sang radian
  const radLat1 = toRadians(lat1);
  const radLon1 = toRadians(lon1);
  const radLat2 = toRadians(lat2);
  const radLon2 = toRadians(lon2);

  // Tính chênh lệch giữa các tọa độ
  const deltaLat = radLat2 - radLat1;
  const deltaLon = radLon2 - radLon1;

  // Công thức Haversine
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Khoảng cách
  const distance = R * c;

  return distance;
};
