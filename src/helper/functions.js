import { DateTime } from "luxon";

function convertDateTime(dateTime) {
	return DateTime.now(dateTime).toFormat("MMMM dd, yyyy");
}

function calculateTimePassed(pastDate) {
	const compare = DateTime.fromISO(new Date().toJSON()).diff(pastDate, [
		"years",
		"months",
		"days",
		"hours",
		"minutes",
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

	if (diff.minutes <= 2) {
		return `${parseInt(diff.minutes)} minute ago`;
	} else if (diff.minutes > 2) {
		return `${parseInt(diff.minutes)} minutes ago`;
	}
}

const fetchRequest = async (
	link,
	method = "GET",
	body,
	token,
	doSomething = console.log,
	raw = true
) => {
	try {
		const res = await fetch(link, {
			method: method,
			body: JSON.stringify(body),
			headers: {
				"Content-type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		if (raw) {
			doSomething(data);
			return data;
		}
		if (!raw) {
			doSomething(data.data);
			return data.data;
		}
	} catch (error) {
		console.log(error);
	}
};

function reloadPage() {
	window.location.reload(true);
}

export { convertDateTime, calculateTimePassed, fetchRequest, reloadPage };
