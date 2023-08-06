import { calculateTimePassed } from "../../helper/functions";
import { DateTime } from "luxon";

const TimePassed = (props) => {
	const { currentTime, className, text = false } = props;

	return (
		<small className={className}>
			{text && `${text} `}
			{calculateTimePassed(DateTime.fromISO(currentTime))}
		</small>
	);
};

export default TimePassed;
