interface FormErrorProps {
  message?: string;
}

function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <p className="text-red-600 text-sm mt-1">
      ⚠️ {message}
    </p>
  );
}

export default FormError;
