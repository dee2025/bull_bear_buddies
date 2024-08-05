// app/page.js
"use client";
import Heading from "@/components/Heading";
import PageLoader from "@/components/PageLoader";
import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getipodata");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="">
      <div className="text-sm text-teal-100">
        <h1 className="heading mb-2">IPO Gray Market Transaction</h1>
        <p className="mb-2">
          In the Indian stock market, an IPO gray market transaction is an
          unofficial agreement between an IPO investor and a stock broker. This
          allows investors to lock in profits before the stock is officially
          listed. Here's how it works:
        </p>
        <ul className="mb-2">
          <li>
            <strong>Agreement:</strong> The investor and broker make an
            unwritten deal.
          </li>
          <li>
            <strong>Shares Sold:</strong> The broker sells the shares allotted
            to the investor’s IPO application.
          </li>
          <li>
            <strong>No Transfer:</strong> The shares are sold without being
            transferred to the broker’s account.
          </li>
          <li>
            <strong>Trust-Based:</strong> This deal relies entirely on the trust
            between the investor and the broker.
          </li>
        </ul>
        <p>
          This process helps investors secure profits in advance but comes with
          risks due to its unofficial nature.
        </p>
      </div>
      {/* <h1>IPO Data</h1> */}
      <div className="py-8">
        <Heading headingText={"Upcoming IPO's Gray Market Price"} />
        <div className="mt-2  overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  IPO's Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  GMP(%)
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    {item.ipoName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {item.date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {item.price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {item.gmp}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
