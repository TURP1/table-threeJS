import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useConfig } from "../contexts/Configurator";
export const Interface = () => {

  const { legsType, setLegsType, tableWidth, setTableWidth } = useConfig()
  return (
    <Box
      sx={{
        position: "absolute",
        top: 50,
        right: 0,
      }}
      p={3}
    >
      <Stack spacing={3}>
        <Typography variant="caption">Table Configurator</Typography>
        <Box className="glass" p={3}>
          <FormControl>
            <FormLabel>Table width</FormLabel>
            <Slider
              sx={{
                width: "200px",
              }}
              min={50}
              max={200}
              value={tableWidth}
              onChange={(e) => setTableWidth(e.target.value)}
              valueLabelDisplay="auto"
            />
          </FormControl>
        </Box>
        <Box className="glass" p={3}>
          <FormControl>
            <FormLabel>Legs Layout</FormLabel>
            <RadioGroup
              value={legsType}
              onChange={(e) => setLegsType(parseInt(e.target.value))}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Standard"
              />
              <FormControlLabel value={1} control={<Radio />} label="Solid" />
              <FormControlLabel value={2} control={<Radio />} label="Design" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Stack>
    </Box>
  );
};
