import { Sparkles, Zap, Star, Gem } from "lucide-react";

export default [
  {
    id: "basic",
    name: "Basic Package",
    credits: 5,
    price: "$1.99",
    image: "/buy-credits-logo-imgs/basic-package-logo.png",
    popular: false,
    color: "from-blue-500 to-cyan-300",
    icon: Zap,
    buttonColor:
      "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600",
  },
  {
    id: "standard",
    name: "Standard Package",
    credits: 20,
    price: "$6.99",
    image: "/buy-credits-logo-imgs/standard-package-logo.png",
    popular: true,
    color: "from-violet-500 to-purple-300",
    icon: Star,
    buttonColor:
      "bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600",
  },
  {
    id: "advanced",
    name: "Advanced Package",
    credits: 50,
    price: "$15.99",
    image: "/buy-credits-logo-imgs/advanced-package-logo.png",
    popular: false,
    color: "from-pink-500 to-rose-300",
    icon: Sparkles,
    buttonColor:
      "bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600",
  },
  {
    id: "professional",
    name: "Professional Package",
    credits: 100,
    price: "$29.99",
    image: "/buy-credits-logo-imgs/professional-package-logo.png",
    popular: false,
    color: "from-orange-500 to-amber-300",
    icon: Gem,
    buttonColor:
      "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600",
  },
];
