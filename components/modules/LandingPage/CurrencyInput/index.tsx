import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCurrencies } from "@/context/Currencies";

const Presets = [100, 200, 500, 1000, 5000, 10000];

export default function CurrencyInput() {
  const { quantity, setQuantity } = useCurrencies();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="mb-2.5">
      <div className="flex justify-center items-center space-x-4 mb-8">
        <Button onClick={handleDecrement} variant="outline" size="icon">
          <MinusIcon className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-32 text-center text-2xl font-bold"
        />
        <Button onClick={handleIncrement} variant="outline" size="icon">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-center items-center space-x-4">
        {Presets.map((preset) => (
          <Button
            key={preset}
            onClick={() => setQuantity(preset)}
            variant="outline"
            size="sm"
          >
            {preset}
          </Button>
        ))}
      </div>
    </div>
  );
}
