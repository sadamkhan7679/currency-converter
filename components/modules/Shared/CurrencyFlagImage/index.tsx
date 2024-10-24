import Image from "next/image";

type CurrencyFlagImageProps = {
  // Three letter currency code
  code: string;
  size?: number;
};

export default function CurrencyFlagImage({
  code,
  size = 32,
}: CurrencyFlagImageProps) {
  return (
    <Image
      src={`https://flagsapi.com/${code.slice(0, 2)}/flat/32.png`}
      alt={code}
      width={size}
      height={size}
    />
  );
}
