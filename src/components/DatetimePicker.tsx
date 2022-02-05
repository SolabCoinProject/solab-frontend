import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

interface Props {
  value: Date;
  onChange: (value: any) => void;
}

const DatetimePicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <DateTimePicker
      format="yyyy-MM-dd HH:mm:ss"
      value={value}
      onChange={onChange}
      disableClock={true}
      disableCalendar={true}
      className="border border-white-500"
    />
  );
};

export default DatetimePicker;
