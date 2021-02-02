export function formatCurrency(amount) {
	// return `$ ${Number(amount.toFixed(2)).toLocaleString()} `
	return `$${amount.toFixed(2)}`
}

export function formatFullDateTime(unixTimeStamp) {
	return new Intl.DateTimeFormat('en-CA', {
		dateStyle: 'full',
		timeStyle: 'long',
	}).format(new Date(unixTimeStamp * 1000))
}
