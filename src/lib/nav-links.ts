import { Home, File, ShoppingCart,ShoppingBag, Package } from "lucide-react";

export const navLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home, 
  },
  {
    title: "Account",
    href: "/account",
    icon: File,
    submenu: [
      { title: "Create Account", href: "/account/create-account" },
      { title: "List Account", href: "/account/list-account" },
    ],
  },
  {
    title: "Create firm",
    href: "/firm",
    icon: Package,
    submenu: [
      {
        title: "create-firm",
        href: "/firm/create-firm/",
      },
      {
        title: "List-firm",
        href: "/firm/list-firm",
      },
    ],
  },
  {
    title: "Transaction",
    href: "/transaction",
    icon: ShoppingCart,
    submenu: [
      { title: "Payment", href: "/transaction/payment/list" },
      { title: "journal", href: "/transaction/journal/list" },
      { title: "contra", href: "/transaction/contra/list" },
    ],
  },
  {
    title: "Expense",
    href: "/expense",
    icon: ShoppingBag,
    submenu: [
      { title: "Create-expense", href: "/expense/create-expense" },
      { title: "List-expense", href: "/expense/list" },
    ],
  },
  
];
