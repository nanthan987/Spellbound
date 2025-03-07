import React from "react";
import styles from "../../styles/home/page.module.css";
import MainMenu from "../../components/homeMenu.js";
import HomepageNav from "../../components/HomepageNav";
import OpponentGamebox from "../../components/OpponentGamebox";
import NavBar from "@/components/NavBar";
import SpellBoundTitle from "@/components/SpellBoundTitle 2";

// creates a homepage with the top navigation menu and main menu items
export default function Home() {
  return (
    <main>
      <div className={styles.HeaderFullScreen}>
        <SpellBoundTitle/>
        <HomepageNav/>
      </div>
      {/*altered navigation bar that uses alternative Header for smaller viewport*/}
      <div className={styles.HeaderMobile}>
        <NavBar TitleText={"SpellBound"} showDifficultyText={false}/>
      </div>
      <MainMenu/>
    </main>
  );
}
