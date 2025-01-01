"use client";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";

function Home() {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [size, setSize] = useState("S");
  const [selectedItem, setSelectedItem] = useState("T");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: merchData,
    isLoading,
    isError,
  } = api.merchandise.getMerchById.useQuery({
    id: 'cm5dwz6jl0001869zkti2ch71',
  });

  // Update price when data is fetched
  useEffect(() => {
    if (merchData) {
      setPrice(merchData.discountPrice); // Assuming the API returns an array with a `price` field
      setName(merchData.name);
      setDescription(merchData.description);
      setTotalCount(merchData.stock);
    }
  }, [merchData]);

  const handleSizeChange = () => {
    if (size === "S") setSize("M");
    else if (size === "M") setSize("L");
    else if (size === "L") setSize("XL");
    else if (size === "XL") setSize("S");
  };

  return (
    <div className="flex h-full w-screen flex-col overflow-x-hidden">
      <div className="flex h-full w-screen flex-col justify-center bg-white md:h-screen md:items-center">
        <div className="flex h-full w-full flex-col bg-neutral-900 p-4 shadow-xl shadow-black/30 md:h-[90vh] md:w-[90vw] md:flex-row md:justify-between md:rounded-3xl">
          <div className="flex h-[60vh] w-full flex-col md:h-full md:w-1/3">
            <div className="mb-2 flex h-full w-full rounded-2xl bg-neutral-400/40"></div>
            <div className="flex h-1/6 w-full flex-col rounded-2xl bg-neutral-400/40"></div>
          </div>
          <div className="flex w-full flex-col items-center justify-center md:w-2/3 md:flex-row">
            <div className="m-10 flex w-full flex-col md:w-1/2">
              <div className="md:mb-32">
                <p className="text-4xl font-extralight text-white md:mb-6 md:text-6xl">
                  {name}
                </p>
                {isLoading ? (
                  <p className="text-neutral-400">Loading...</p>
                ) : isError ? (
                  <p className="text-red-500">Failed to load merchandise</p>
                ) : (
                  <p className="my-2 text-2xl font-extralight text-white md:text-4xl">
                    ${price}
                  </p>
                )}
              </div>
              <div className="flex h-full w-full flex-col justify-center">
                <div className="justify-center-center flex flex-row gap-2 md:flex-col">
                  <div className="my-1 flex h-16 w-full flex-row items-center justify-between rounded-2xl bg-neutral-400/40 p-1">
                    <div className="mx-auto text-neutral-100">{size}</div>
                    <div
                      className="h-full w-3/4 cursor-pointer select-none rounded-xl bg-neutral-900 py-4 text-center text-neutral-400"
                      onClick={handleSizeChange}
                    >
                      Change Size
                    </div>
                  </div>
                  <div className="my-1 flex h-16 w-full flex-row items-center justify-between rounded-2xl bg-neutral-400/40 p-1">
                    <div
                      className="h-full w-1/3 cursor-pointer select-none rounded-xl bg-neutral-900 py-4 text-center text-neutral-400"
                      onClick={() => {
                        if (count > 0) setCount(count - 1);
                      }}
                    >
                      -
                    </div>
                    <div className="text-neutral-200">{count}</div>
                    <div
                      className="h-full w-1/3 cursor-pointer select-none rounded-xl bg-neutral-900 py-4 text-center text-neutral-400"
                      onClick={() => {
                        if (count >= 0 && count < totalCount)
                          setCount(count + 1);
                      }}
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className="mt-8 h-16 w-full cursor-pointer select-none justify-center rounded-2xl bg-neutral-400/40 py-5 text-center text-neutral-200">
                  Add to Cart
                </div>
              </div>
            </div>
            <div className="scrollable m-4 flex h-auto w-full flex-col rounded-xl bg-neutral-800 p-4 text-white md:max-h-full md:w-1/2 md:overflow-y-auto md:bg-neutral-900">
              <p className="text-lg text-neutral-400 md:text-xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
