"use client";

import CurrencyCard from "@/components/modules/LandingPage/CurrencyPairs/CurrencyCard";
import { useCurrencies } from "@/context/Currencies";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

export default function CurrencyPairsList({}) {
  const { selectedCurrencies, handleSelectedCurrenciesUpdate } =
    useCurrencies();

  const handleDragEnd = (result: DropResult) => {
    // const { source, destination } = result;

    // console.log("sourse", source);
    // console.log("destination", destination);

    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // console.log("selectedCurrencies", selectedCurrencies);

    // setTimeout(() => {
    const newSelectedCurrencies = Array.from(selectedCurrencies);
    const [reorderedCurrency] = newSelectedCurrencies.splice(sourceIndex, 1);
    newSelectedCurrencies.splice(destinationIndex, 0, reorderedCurrency);

    console.log(newSelectedCurrencies);

    handleSelectedCurrenciesUpdate(newSelectedCurrencies);
    // }, 1000);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="CURRENCIES_PAIRS_LIST">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              {selectedCurrencies.map((currency, index) => {
                const uniqueKey = `currency-pairs-${currency}`;

                return (
                  <Draggable
                    key={uniqueKey}
                    draggableId={uniqueKey}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="relative group"
                      >
                        <CurrencyCard key={currency} currencyCode={currency} />
                        <div
                          {...provided.dragHandleProps}
                          className="absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-0 group-hover:bg-opacity-20 cursor-move"
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
