"use client"

import ReactSelect, { SingleValue } from "react-select"

interface MultiSelectProps {
  label: string
  value?: Record<string, any>
  onChange: (value: SingleValue<Record<string, any>>) => void
  options: Record<string, any>[]
  disabled?: boolean
}

const Select: React.FC<MultiSelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  return (
    <div className="z-[100]">
      <label
        className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-black
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  )
}

export default Select
