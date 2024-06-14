import Image from "next/image"
import Logo from "../../../public/static/logo.png"


const styles = {
    wrapper: `flex justify-center gap-10 p-5 bg-[#FCC017]`,
    content: `max-w-7xl flex-1 flex justify-between gap-10`,
    logoContainer: 'flex items-center flex-start',
    logo: 'cursor-pointer object-contain',
    bannerNav: 'flex cursor-pointer items-center justify-end gap-3 space-x-5',
    accentedButton: 'bg-black text-white py-2 px-4 rounded-full'
}

const Header = () => {
    return (
        <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.logoContainer}>
            <Image
                className={styles.logo}
                src={Logo}
                height={40}
                width={200}
                alt='logo'
            />
                      
         </div>
         <div className={styles.bannerNav}>
            <div>Our Story</div>
            <div>Membership</div>
            <div>Sign In</div>
            <div className={styles.accentedButton}>Get Started</div>
         </div>
        </div>
      </div>
    )
}

export default Header

// TODO: refactor file name, convention: "PostCard", we use the .tsx here to enable typescript, remove .js
// TODO: put className using inline styling, "const styles" might seem tidy but bad practice