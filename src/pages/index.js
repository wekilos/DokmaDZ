import { lazy } from "react";
export const Home = lazy(() => import("./home/Home"));
export const About = lazy(() => import("./about/about"));
export const Products = lazy(() => import("./products/products"));
export const Pictures = lazy(() => import("./products/pictures"));
export const Contact = lazy(() => import("./about/contact"));
export const News = lazy(() => import("./news/new"));
export const AllNews = lazy(() => import("./news/news"));
