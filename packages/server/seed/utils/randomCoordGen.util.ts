import RandomGenerator from 'random-points-generator';

// Bounds
// 42.262226, -71.457654 - Ashland, MA (Southwest)
// 42.937023, -70.833338 - Hampton, NH (Northeast)
export const randomCoordGen = () => {
  const { features } = RandomGenerator.random(1, {
    bbox: [42.262226, -71.457654, 42.937023, -70.833338],
  });

  const { geometry } = features[0];
  // Need to reverse as PostGIS digests: [lng, lat]
  geometry.coordinates.reverse();

  return geometry;
};
