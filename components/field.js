import React from 'react'

export default function Field({
	type = 'text',
	id,
	name = id,
	label,
	required,
	onChange,
}) {
	return (
		<div className="field">
			<input
				type={type}
				id={id}
				name={name}
				required={required}
				onChange={onChange}
				autoComplete="off"
			/>
			<label htmlFor={id}>
				<span>{label}</span>
			</label>
		</div>
	)
}
