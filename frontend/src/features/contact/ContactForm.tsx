import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { social } from "@config/site";
import "./ContactForm.css";

interface Labels {
  name: string;
  email: string;
  message: string;
  send: string;
  errors: {
    required: string;
    invalidEmail: string;
  };
}

interface Props {
  labels: Labels;
}

interface Values {
  subject: string;
  email: string;
  message: string;
}

type FieldKey = keyof Values;
type Errors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_ORDER: FieldKey[] = ["subject", "email", "message"];

function validate(values: Values, errLabels: Labels["errors"]): Errors {
  const errors: Errors = {};
  if (!values.subject.trim()) errors.subject = errLabels.required;
  if (!values.email.trim()) errors.email = errLabels.required;
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = errLabels.invalidEmail;
  if (!values.message.trim()) errors.message = errLabels.required;
  return errors;
}

export default function ContactForm({ labels }: Props) {
  const subjectId = useId();
  const emailId = useId();
  const messageId = useId();
  const fieldIds: Record<FieldKey, string> = {
    subject: subjectId,
    email: emailId,
    message: messageId,
  };

  const [values, setValues] = useState<Values>({
    subject: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const submittedOnceRef = useRef(false);

  // After the first submit attempt, re-validate live as the user edits
  // so errors clear when the field becomes valid.
  useEffect(() => {
    if (submittedOnceRef.current) {
      setErrors(validate(values, labels.errors));
    }
  }, [values, labels.errors]);

  const update =
    (key: FieldKey) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
    };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submittedOnceRef.current = true;
    const newErrors = validate(values, labels.errors);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((k) => newErrors[k]);
      if (firstInvalid) {
        document.getElementById(fieldIds[firstInvalid])?.focus();
      }
      return;
    }

    setSubmitting(true);
    const body = `${values.message.trim()}\n\n— ${values.email.trim()}`;
    const href =
      `https://mail.google.com/mail/u/0/?fs=1` +
      `&to=${social.emailAddress}` +
      `&su=${encodeURIComponent(values.subject.trim())}` +
      `&body=${encodeURIComponent(body)}` +
      `&tf=cm`;
    window.open(href, "_blank", "noopener,noreferrer");
    setSubmitting(false);
  }

  return (
    <form className="cf" onSubmit={handleSubmit} noValidate>
      <Field
        id={subjectId}
        name="subject"
        type="text"
        label={labels.name}
        value={values.subject}
        onChange={update("subject")}
        error={errors.subject}
      />
      <Field
        id={emailId}
        name="email"
        type="email"
        autoComplete="email"
        label={labels.email}
        value={values.email}
        onChange={update("email")}
        error={errors.email}
      />
      <Field
        id={messageId}
        name="message"
        type="textarea"
        label={labels.message}
        value={values.message}
        onChange={update("message")}
        error={errors.message}
      />
      <button type="submit" className="cf__submit" disabled={submitting}>
        <span>{labels.send}</span>
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  autoComplete?: string;
}

function Field({
  id,
  name,
  label,
  type,
  value,
  onChange,
  error,
  autoComplete,
}: FieldProps) {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div
      className={`cf__row${hasError ? " is-invalid" : ""}`}
      // Password managers (LastPass, 1Password) inject sibling DOM nodes
      // into form rows before React hydrates, causing a hydration mismatch.
      // The form itself is unchanged; suppress the warning for this subtree.
      suppressHydrationWarning
    >
      <div className="cf__row-head">
        <label className="cf__label" htmlFor={id}>
          {label}
        </label>
        {hasError && (
          <span id={errorId} className="cf__error" role="alert">
            {error}
          </span>
        )}
      </div>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={6}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className="cf__input cf__textarea"
          suppressHydrationWarning
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className="cf__input"
          suppressHydrationWarning
        />
      )}
    </div>
  );
}
