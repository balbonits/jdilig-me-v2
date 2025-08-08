import { fetchExercises, fetchUtilities, fetchAllCodeData, fetchExerciseBySlug, fetchUtilityBySlug } from './data-fetchers';

// Mock fetch globally
global.fetch = jest.fn();

describe('data-fetchers utilities', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('fetchExercises', () => {
    test('should fetch exercises successfully', async () => {
      const mockExercises = [
        { slug: 'test-exercise', metadata: { title: 'Test Exercise' } }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchExercises();

      expect(fetch).toHaveBeenCalledWith('/exercises.json');
      expect(result).toEqual(mockExercises);
    });

    test('should throw error when fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(fetchExercises()).rejects.toThrow('Failed to fetch exercises: 404 Not Found');
    });
  });

  describe('fetchUtilities', () => {
    test('should fetch utilities successfully', async () => {
      const mockUtilities = [
        { slug: 'test-utility', metadata: { title: 'Test Utility' } }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUtilities,
      });

      const result = await fetchUtilities();

      expect(fetch).toHaveBeenCalledWith('/utilities.json');
      expect(result).toEqual(mockUtilities);
    });

    test('should throw error when fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(fetchUtilities()).rejects.toThrow('Failed to fetch utilities: 500 Internal Server Error');
    });
  });

  describe('fetchAllCodeData', () => {
    test('should fetch both exercises and utilities concurrently', async () => {
      const mockExercises = [{ slug: 'exercise1' }];
      const mockUtilities = [{ slug: 'utility1' }];

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockExercises,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUtilities,
        });

      const result = await fetchAllCodeData();

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith('/exercises.json');
      expect(fetch).toHaveBeenCalledWith('/utilities.json');
      expect(result).toEqual({
        exercises: mockExercises,
        utilities: mockUtilities,
      });
    });
  });

  describe('fetchExerciseBySlug', () => {
    test('should find exercise by slug', async () => {
      const mockExercises = [
        { slug: 'exercise1', metadata: { title: 'Exercise 1' } },
        { slug: 'exercise2', metadata: { title: 'Exercise 2' } },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchExerciseBySlug('exercise2');

      expect(result).toEqual(mockExercises[1]);
    });

    test('should return undefined for non-existent slug', async () => {
      const mockExercises = [
        { slug: 'exercise1', metadata: { title: 'Exercise 1' } },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchExerciseBySlug('non-existent');

      expect(result).toBeUndefined();
    });
  });

  describe('fetchUtilityBySlug', () => {
    test('should find utility by slug', async () => {
      const mockUtilities = [
        { slug: 'utility1', metadata: { title: 'Utility 1' } },
        { slug: 'utility2', metadata: { title: 'Utility 2' } },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUtilities,
      });

      const result = await fetchUtilityBySlug('utility1');

      expect(result).toEqual(mockUtilities[0]);
    });

    test('should return undefined for non-existent slug', async () => {
      const mockUtilities = [
        { slug: 'utility1', metadata: { title: 'Utility 1' } },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUtilities,
      });

      const result = await fetchUtilityBySlug('non-existent');

      expect(result).toBeUndefined();
    });
  });
});
