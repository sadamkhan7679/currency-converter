"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrencies } from "@/context/Currencies";
import CurrencyFlagImage from "@/components/modules/Shared/CurrencyFlagImage";
import { Check } from "lucide-react";

export default function CurrenciesList({}) {
  const { currencies, handleCurrencySelect, selectedCurrencies } =
    useCurrencies();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          Add Currency
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">Select Currency</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          {currencies.map((currency) => {
            const isSelected = selectedCurrencies.some(
              (code) => code === currency.code,
            );

            return (
              <Button
                key={currency.code}
                variant="ghost"
                className="w-full justify-between mb-2 text-black"
                onClick={() => handleCurrencySelect(currency.code)}
                // disabled={selectedCurrencies.some(
                //   (c) => c.code === currency.code,
                // )}
              >
                <span className="flex items-center">
                  <span className="mr-2 text-2xl">
                    <CurrencyFlagImage code={currency.code} />
                  </span>
                  <span>
                    {currency.name} ({currency.code})
                  </span>
                </span>
                <span>{isSelected && <Check className="h-6 w-6" />}</span>
              </Button>
            );
          })}
        </ScrollArea>
        <DialogFooter>
          <DialogClose>
            <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
