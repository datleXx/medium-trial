const Footer = () => { 
    return (
        <div className="max-w-7xl flex gap-5 bg-black text-white text-sm py-7 items-center justify-start lg:justify-center lg:text-[#787878] lg:bg-white"> 
            <div className="cursor-pointer">Help</div>
            <div className="cursor-pointer hidden lg:block">Status</div>
            <div className="cursor-pointer">About</div>
            <div className="cursor-pointer hidden lg:block">Careers</div>
            <div className="cursor-pointer hidden lg:block">Press</div>
            <div className="cursor-pointer hidden lg:block">Blog</div>
            <div className="cursor-pointer">Privacy</div>
            <div className="cursor-pointer">Terms</div>
            <div className="cursor-pointer hidden lg:block">Text to Speech</div>
            <div className="cursor-pointer hidden lg:block">Team</div>
        </div>
    )


}

export default Footer; 