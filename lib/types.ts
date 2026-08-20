import type { NextPage } from "next";
import type { AppProps } from "next/app";

export interface Product {
  id: string;
  name: string;
  cat: string;
  price: number;
  tag: string;
  note: string;
  image: string;
  installments?: boolean;
}

export interface Repair {
  name: string;
  covers: string;
  price: number;
  eta: string;
  image: string;
}

export interface DeviceOption {
  id: string;
  label: string;
  ex: string;
  mult: number;
}

export interface IssueOption {
  id: string;
  label: string;
  base: number;
}


export interface CartItem {
  id: string;
  name: string;
  priceFmt: string;
  qty: number;
}

export interface Booking {
  name: string;
  phone: string;
  model: string;
  date: string;
  time: string;
}

export type NextPageWithTitle<P = {}> = NextPage<P> & { pageTitle?: string };

export type AppPropsWithTitle = AppProps & {
  Component: NextPageWithTitle;
};
