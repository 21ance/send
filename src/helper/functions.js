import { DateTime } from "luxon";

function calculateTimePassed(pastDate) {
	const compare = DateTime.fromISO(new Date().toJSON()).diff(pastDate, [
		"years",
		"months",
		"days",
		"hours",
	]);

	const diff = compare.values;

	if (diff.years === 1) {
		return `${diff.years} year ago`;
	} else if (diff.years > 1) {
		return `${diff.years} years ago`;
	}

	if (diff.months === 1) {
		return `${diff.months} month ago`;
	} else if (diff.months > 1) {
		return `${diff.months} months ago`;
	}

	if (diff.days === 1) {
		return `${diff.days} day ago`;
	} else if (diff.days > 1) {
		return `${diff.days} days ago`;
	}

	if (diff.hours === 1) {
		return `${parseInt(diff.hours)} hour ago`;
	} else if (diff.hours > 1) {
		return `${parseInt(diff.hours)} hours ago`;
	}
}

export { calculateTimePassed };
