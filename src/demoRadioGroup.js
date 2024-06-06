import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const DemoRadioGroup = ({ groupedColumnMode, setGroupedColumnMode }) => {
  return (
    <FormControl sx={{ margin: "auto", textAlign: "center" }}>
      <FormLabel>Grouped Column Mode</FormLabel>
      <RadioGroup
        row
        value={groupedColumnMode}
        onChange={event =>
          setGroupedColumnMode(
            event.target.value === "false" ? false : event.target.value
          )
        }
      >
        <FormControlLabel
          control={<Radio />}
          label='"reorder" (default)'
          value="reorder"
        />
        <FormControlLabel control={<Radio />} label='"remove"' value="remove" />
        <FormControlLabel value={false} control={<Radio />} label="false" />
      </RadioGroup>
    </FormControl>
  );
};

export default DemoRadioGroup;
