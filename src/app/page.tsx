// import Image from "next/image";
import styles from "./page.module.css";
"use client";
import { Provider } from 'react-redux';
import store from '../redux/store';
import JobPostsList from '@/components/JobPostsList';

export default function Home() {
  return (
     <main >
      <JobPostsList />
    </main>  

  );
}
