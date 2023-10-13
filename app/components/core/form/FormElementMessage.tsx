interface FormElementMessageInterface {
  message: string;
  className: string;
}

export default function FormElementMessage({message, className}: FormElementMessageInterface) {
  return (
    <div className={`mt-1 form-element-message ${className}`}>
      {message}
    </div>
  )
}
