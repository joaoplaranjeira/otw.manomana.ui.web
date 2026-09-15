import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; suffix?: string };

export function TextInput({ label, suffix, id, className = "", ...props }: Props) {
  const inputId = id || props.name;
  return (
    <label className={`field ${className}`} htmlFor={inputId}>
      <span className="field__label">{label}</span>
      <span className="field__control">
        <input id={inputId} {...props} />
        {suffix && <span className="field__suffix">{suffix}</span>}
      </span>
    </label>
  );
}

type NumberStepperProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  placeholder: number;
  step?: number;
  suffix: string;
  autoFocus?: boolean;
  required?: boolean;
};

export function NumberStepper({ label, name, value, onChange, min, max, placeholder, step = 1, suffix, autoFocus, required }: NumberStepperProps) {
  const adjust = (amount: number) => {
    const current = value === "" ? placeholder : Number(value);
    onChange(String(Math.min(max, Math.max(min, current + amount))));
  };

  const normalize = () => {
    if (value === "") return;
    onChange(String(Math.min(max, Math.max(min, Number(value)))));
  };

  return (
    <div className="field field--stepper">
      <label className="field__label" htmlFor={name}>{label}</label>
      <div className="number-stepper">
        <button type="button" onClick={() => adjust(-step)} disabled={value !== "" && Number(value) <= min} aria-label={`Diminuir ${label.toLowerCase()}`}>−</button>
        <span className="number-stepper__value">
          <input id={name} name={name} type="number" inputMode="numeric" min={min} max={max} step={step} placeholder={String(placeholder)} value={value} onChange={(event) => onChange(event.target.value)} onBlur={normalize} autoFocus={autoFocus} required={required} />
          <span>{suffix}</span>
        </span>
        <button type="button" onClick={() => adjust(step)} disabled={value !== "" && Number(value) >= max} aria-label={`Aumentar ${label.toLowerCase()}`}>+</button>
      </div>
    </div>
  );
}
