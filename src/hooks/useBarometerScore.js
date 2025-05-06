import { useState } from 'react';

const useBarometerScore = () => {
  const [score, setScore] = useState(0);

  const calculateScore = (formData) => {
    let newScore = 0;

    // Helper function to get form value
    const getValue = (name) => {
      if (formData instanceof FormData) {
        return formData.get(name);
      }
      return formData.get(name);
    };

    // Team Familiarity (0 = existing, 1 = new)
    if (getValue('teamFamiliarity') === '1') {
      newScore += 20;
    }

    // Team Size (0 = small, 1 = medium, 2 = large)
    const teamSize = getValue('teamSize');
    if (teamSize === '0') {
      newScore -= 20;
    } else if (teamSize === '2') {
      newScore += 10;
    }

    // Overall Experience (0 = experienced, 1 = mixed, 2 = inexperienced)
    const experience = getValue('experience');
    if (experience === '0') {
      newScore -= 20;
    } else if (experience === '2') {
      newScore += 20;
    }

    // Project Complexity (0 = simple, 1 = moderate, 2 = complex)
    const complexity = getValue('complexity');
    if (complexity === '0') {
      newScore -= 20;
    } else if (complexity === '2') {
      newScore += 20;
    }

    // Project Duration (0 = short, 1 = medium, 2 = long)
    const duration = getValue('duration');
    if (duration === '0') {
      newScore -= 20;
    } else if (duration === '2') {
      newScore += 10;
    }

    setScore(newScore);
  };

  const getArchitectType = (score) => {
    if (score > 20) return 'Control Freak Architect';
    if (score < -20) return 'Armchair Architect';
    return 'Effective Architect';
  };

  return {
    score,
    calculateScore,
    getArchitectType,
  };
};

export default useBarometerScore; 