# Architect Guidance Barometer

A tool to help software architects determine the appropriate level of involvement and guidance they should exert on development teams. Based on the "How much control?" section from Chapter 22 of "Fundamentals of Software Architecture" by Mark Richards and Neal Ford.

## Features

- Interactive barometer visualization
- Form-based input for key factors affecting architectural guidance
- Real-time score calculation
- Visual feedback on architect type 

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/arch-guidance-barometer.git
   cd arch-guidance-barometer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Usage

1. Fill out the form with your team and project details:
   - Team Familiarity
   - Team Size
   - Overall Experience
   - Project Complexity
   - Project Duration

2. Click "Calculate Guidance Level" to see the results

3. The barometer will show:
   - Red zone (+20 to +100): Control Freak Architect
   - Green zone (-20 to +20): Effective Architect
   - Yellow zone (-20 to -100): Armchair Architect

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Based on "Fundamentals of Software Architecture" by Mark Richards and Neal Ford
- Built with React, Tailwind CSS, and Vite
