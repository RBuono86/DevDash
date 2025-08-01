import React, { useEffect, useState } from "react";

const quotes = [
  {
    text: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
  },
  {
    text: "Java is to JavaScript what car is to Carpet.",
    author: "Chris Heilmann",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
];

const QuoteWidget: React.FC = () => {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(
    null
  );

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  if (!quote) return null;

  return (
    <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Quote of the Day</h2>
      <p className="italic">“{quote.text}”</p>
      <p className="text-sm mt-2 text-right">— {quote.author}</p>
    </div>
  );
};

export default QuoteWidget;
