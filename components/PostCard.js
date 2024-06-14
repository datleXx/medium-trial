import Image from "next/image";
import Logo from "./../static/logo.png"; 
import { FiBookmark } from "react-icons/fi";
const styles = {
    wrapper:`flex max-width-[46rem] h-[10rem] items-center gap-[1rem] cursor-pointer`,
    authorContainer: `flex gap-[.4rem]`, 
    authorImageContainer: `grid place-items-center rounded-full overflow-hidden h-[1.4rem] w-[1.4rem]`, 
    authorImage: `object-cover`, 
    authorName: `font-semibold`,
    title: `font-bold text-2xl`,
    briefing:`text-[#787878]`, 
    detailsContainer: `flex items-center justify-between text-[#787878]`, 
    articleDetails: `my-2 text-[.8rem]`, 
    category:`bg-[#F2F3F2] p-1 rounded-full`, 
    bookmarkContainer:`cursor-pointer`,

    postDetails: `flex flex-col`, 
}

const PostCard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.postDetails}>
                <div className={styles.authorContainer}>
                    <div className={styles.authorImageContainer}>
                        <Image
                            alt="postcard"
                            src = {Logo}
                            className={styles.authorImage}
                            width={40}
                            height={40}
                        />

                    </div>
                    <div className={styles.authorName}>Xuan Dat Le</div>
                </div>
                <h1 className={styles.title}>Blahasdfasdfkj; sdfk;asjdf laksdfj sdf </h1>
                <div className={styles.briefing}>Lalasldflsadf sdfasdflasdflasfdj</div>

                <div className={styles.detailsContainer}>
                    <span className={styles.articleDetails}>Jun 15 • 5 min read • <span className={styles.category}>Productivity</span></span>
                    <span className={styles.bookmarkContainer}>
                        <FiBookmark className='h-5 w-5'/>
                    </span>
                </div>
            </div>
            <div className={styles.thumbnailContainer}>
                    <Image
                        src={Logo}
                        height={100}
                        width={100}
                    />
            </div>
        </div>
    )
}

export default PostCard; 