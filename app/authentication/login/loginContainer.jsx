import Image from 'next/image'
import React from 'react'
import styles from '../../../styles/login.module.css'
import Form from './loginForm'
import Close from '../closeButton'
import Link from 'next/link'

/* Contains logo, page title and form */
const ContainerCard = () => {
  return (
    <div className={styles.mainContainer}>
        {// Logo image}
        <Image src="/images/spellboundlogo.png" className={styles.logo} width={125} height={130} />
        <div className={styles.formContainer}>
            {// Close icon, redirects to root dir}
            <Close path="/"/>
            <div className={styles.header}>
                Login
                <Image src='/images/underline.png' width={200} height={10}/>
            </div>
            {// Login form}
            <Form/>
            {/* <div className={styles.bottomBanner}>
              <Link href="#">forgot Password?</Link>
            </div> */}
        </div>
    </div>
  )
}

export default ContainerCard
