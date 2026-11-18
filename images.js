// The hotel's own photos, served from /public/images.
const p = (n) => `/images/${n}.jpg`;
export const I = {
  // Exteriors
  saiPriya: p(5021), // Sai Priya Residency building
  vijay: p(5027),    // Hotel Vijay International building
  // Common areas
  reception: p(5024), // Reception desk
  lobby: p(5018),     // Lobby seating
  corridor: p(5007),  // Room corridor
  // Rooms
  roomNonAc: p(4948), roomAc: p(5011), roomSuite: p(5013),
  room4: p(4945), room5: p(5009), room6: p(5016), room7: p(5000), room8: p(4951),
};

// Natural sizes (width, height) so gallery photos can be shown uncropped.
const DEFAULT_SIZE = [1086, 1448];
const SIZES = { [p(5018)]: [1600, 900] };
export const sizeOf = (src) => SIZES[src] || DEFAULT_SIZE;
