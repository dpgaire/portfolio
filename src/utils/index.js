const getRandomGradient = () => {
  const gradients = [
    "from-gray-800 to-gray-600",
    "from-blue-600 to-blue-400",
    "from-green-600 to-green-400",
    "from-yellow-600 to-yellow-400",
    "from-red-600 to-red-400",
    "from-purple-600 to-purple-400",
    "from-pink-600 to-pink-400",
    "from-teal-600 to-teal-400",
  ];

  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};


export {getRandomGradient};