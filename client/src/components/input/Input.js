import React from 'react'

const Input = ({
    label = "",
    name = "",
    type ="",
    className = "",
    isRequired = true,
    placeholder = "",
    value = "",
    onChange = () =>{},
}) => {
  return (
    <div class="w-full mt-4">
    <label for={name}>{label}</label>
    <input className={
      "block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 ${className}"} placeholder={placeholder} aria-label="Full Name" required={isRequired} type={type} value={value} onChange={onChange}/>
    </div>
  )
}

export default Input


