import { render, screen } from '@testing-library/react';
import Barometer from '../../barometer/Barometer';

const getArchitectType = (score) => {
  if (score > 20) return 'Control Freak Architect';
  if (score < -20) return 'Armchair Architect';
  return 'Effective Architect';
};

describe('Barometer', () => {
  it('renders the correct architect type based on score', () => {
    // Test Control Freak Architect
    render(<Barometer score={30} architectType={getArchitectType(30)} />);
    expect(screen.getByText('Control Freak Architect')).toBeInTheDocument();

    // Test Effective Architect
    render(<Barometer score={0} architectType={getArchitectType(0)} />);
    expect(screen.getByText('Effective Architect')).toBeInTheDocument();

    // Test Armchair Architect
    render(<Barometer score={-30} architectType={getArchitectType(-30)} />);
    expect(screen.getByText('Armchair Architect')).toBeInTheDocument();
  });
}); 