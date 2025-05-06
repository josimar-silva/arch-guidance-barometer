import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const TEAM_FAMILIARITY_LABELS = ['Existing team', 'New team'];
const TEAM_SIZE_LABELS = ['Small', 'Medium', 'Large'];
const EXPERIENCE_LABELS = ['Experienced', 'Mixed', 'Inexperienced'];
const COMPLEXITY_LABELS = ['Simple', 'Moderate', 'Complex'];
const DURATION_LABELS = ['Short', 'Medium', 'Long'];

const sliderSx = {
  '& .MuiSlider-markLabel': {
    fontSize: '0.75rem',
  },
  '& .MuiSlider-mark': {
    display: 'none',
  },
  '& .MuiSlider-markLabel[data-index="0"]': {
    transform: 'translateX(0%)',
  },
  '& .MuiSlider-markLabel[data-index="1"]': {
    transform: 'translateX(-100%)',
  },
  '& .MuiSlider-markLabel[data-index="2"]': {
    transform: 'translateX(-100%)',
  },
};

const ArchitectForm = ({ onSubmit }) => {
  const [teamFamiliarity, setTeamFamiliarity] = useState(0);
  const [teamSize, setTeamSize] = useState(1);
  const [experience, setExperience] = useState(1);
  const [complexity, setComplexity] = useState(1);
  const [duration, setDuration] = useState(1);

  // Call onSubmit with a FormData-like object
  const handleChange = useCallback(() => {
    const formData = {
      get: (name) => {
        switch (name) {
          case 'teamFamiliarity': return String(teamFamiliarity);
          case 'teamSize': return String(teamSize);
          case 'experience': return String(experience);
          case 'complexity': return String(complexity);
          case 'duration': return String(duration);
          default: return '';
        }
      }
    };
    onSubmit(formData);
  }, [onSubmit, teamFamiliarity, teamSize, experience, complexity, duration]);

  useEffect(() => {
    handleChange();
  }, [teamFamiliarity, teamSize, experience, complexity, duration]);

  return (
    <Box component="form" width="100%" display="flex" flexDirection="column" gap={4}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Team Familiarity
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {TEAM_FAMILIARITY_LABELS[teamFamiliarity]}
          </Typography>
        </Box>
        <Slider
          value={teamFamiliarity}
          min={0}
          max={1}
          step={1}
          marks={[{ value: 0, label: TEAM_FAMILIARITY_LABELS[0] }, { value: 1, label: TEAM_FAMILIARITY_LABELS[1] }]}
          onChange={(_, v) => setTeamFamiliarity(Number(v))}
          valueLabelDisplay="off"
          sx={sliderSx}
          aria-label="Team Familiarity"
        />
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Team Size
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {TEAM_SIZE_LABELS[teamSize]}
          </Typography>
        </Box>
        <Slider
          value={teamSize}
          min={0}
          max={2}
          step={1}
          marks={TEAM_SIZE_LABELS.map((label, i) => ({ value: i, label }))}
          onChange={(_, v) => setTeamSize(Number(v))}
          valueLabelDisplay="off"
          sx={sliderSx}
          aria-label="Team Size"
        />
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Overall Experience
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {EXPERIENCE_LABELS[experience]}
          </Typography>
        </Box>
        <Slider
          value={experience}
          min={0}
          max={2}
          step={1}
          marks={EXPERIENCE_LABELS.map((label, i) => ({ value: i, label }))}
          onChange={(_, v) => setExperience(Number(v))}
          valueLabelDisplay="off"
          sx={sliderSx}
          aria-label="Overall Experience"
        />
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Project Complexity
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {COMPLEXITY_LABELS[complexity]}
          </Typography>
        </Box>
        <Slider
          value={complexity}
          min={0}
          max={2}
          step={1}
          marks={COMPLEXITY_LABELS.map((label, i) => ({ value: i, label }))}
          onChange={(_, v) => setComplexity(Number(v))}
          valueLabelDisplay="off"
          sx={sliderSx}
          aria-label="Project Complexity"
        />
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Project Duration
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {DURATION_LABELS[duration]}
          </Typography>
        </Box>
        <Slider
          value={duration}
          min={0}
          max={2}
          step={1}
          marks={DURATION_LABELS.map((label, i) => ({ value: i, label }))}
          onChange={(_, v) => setDuration(Number(v))}
          valueLabelDisplay="off"
          sx={sliderSx}
          aria-label="Project Duration"
        />
      </Box>
    </Box>
  );
};

ArchitectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ArchitectForm; 