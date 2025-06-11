import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui";

interface Props {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  errorClass: string;
  isLoading: boolean;
}

export const VerificationCodeInput: React.FC<Props> = ({
  code,
  setCode,
  errorClass,
  isLoading,
}) => {
  return (
    <InputOTP
      disabled={isLoading}
      maxLength={6}
      value={code}
      onChange={setCode}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <InputOTPGroup key={index}>
          <InputOTPSlot index={index} className={errorClass} />
        </InputOTPGroup>
      ))}
    </InputOTP>
  );
};
