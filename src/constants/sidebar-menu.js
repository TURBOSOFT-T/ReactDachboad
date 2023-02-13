import DashboardIcon from '../assets/icons/dashboard.svg';
import OrdeIcon from '../assets/icons/order.svg';
import UserIcon from '../assets/icons/user.svg';
import InsuranceIcon from '../assets/icons/insurance.svg';
import ItemIcon from '../assets/icons/item.svg';

const sidebar_menu = [
  {
    id: 1,
    icon: DashboardIcon,
    path: "/",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: OrdeIcon,
    path: "/order",
    title: "Orders",
  },

  {
    id: 3,
    icon: InsuranceIcon,
    path: "/insurances",
    title: "Insurance",
  },

  {
    id: 4,
    icon: ItemIcon,
    path: "/items",
    title: "Item",
  },
  {
    id: 5,
    icon: UserIcon,
    path: "/profile",
    title: "My account",
  },
];

export default sidebar_menu;