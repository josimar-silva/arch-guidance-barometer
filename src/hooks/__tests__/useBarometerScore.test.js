import { renderHook, act } from '@testing-library/react';
import useBarometerScore from '../useBarometerScore';

describe('useBarometerScore', () => {
  it('calculates score correctly', () => {
    const { result } = renderHook(() => useBarometerScore());
    
    // Create form data object that matches ArchitectForm's structure
    const formData = {
      get: (name) => {
        switch (name) {
          case 'teamFamiliarity': return '1'; // new team
          case 'teamSize': return '0'; // small team
          case 'experience': return '0'; // experienced
          case 'complexity': return '0'; // simple
          case 'duration': return '0'; // short
          default: return '';
        }
      }
    };

    act(() => {
      result.current.calculateScore(formData);
    });

    // new team (+20) - small team (-20) - experienced (-20) - simple (-20) - short (-20) = -60
    expect(result.current.score).toBe(-60);
  });

  it('returns correct architect type based on score', () => {
    const { result } = renderHook(() => useBarometerScore());
    
    expect(result.current.getArchitectType(30)).toBe('Control Freak Architect');
    expect(result.current.getArchitectType(0)).toBe('Effective Architect');
    expect(result.current.getArchitectType(-30)).toBe('Armchair Architect');
  });
}); 