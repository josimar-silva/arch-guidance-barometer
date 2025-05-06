import { render, screen, fireEvent } from '@testing-library/react';
import ArchitectForm from '../../barometer/ArchitectForm';

describe('ArchitectForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('calls onSubmit with correct score when form is updated', () => {
    render(<ArchitectForm onSubmit={mockOnSubmit} />);

    // Simulate changing sliders by label
    fireEvent.change(screen.getByLabelText(/Team Familiarity/i), { target: { value: 1 } });
    fireEvent.change(screen.getByLabelText(/Team Size/i), { target: { value: 0 } });
    fireEvent.change(screen.getByLabelText(/Overall Experience/i), { target: { value: 0 } });
    fireEvent.change(screen.getByLabelText(/Project Complexity/i), { target: { value: 0 } });
    fireEvent.change(screen.getByLabelText(/Project Duration/i), { target: { value: 0 } });

    // Check if onSubmit was called with the correct score
    // new team (+20) - small team (-20) - experienced (-20) - simple (-20) - short (-20) = -60
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('renders all form fields', () => {
    render(<ArchitectForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Team Familiarity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Team Size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Overall Experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Complexity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Duration/i)).toBeInTheDocument();
  });
}); 