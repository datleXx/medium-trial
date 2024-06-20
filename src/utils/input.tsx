interface InputProps {
    type?: string, 
    title?: string 
}

const Input = ({type, title}: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm capitalize">{title}</label>
            <input 
                className="text-center border-b border-black outline-none"
                type={type}
                name={title}
            />
            
        </div>
    )
}

export default Input; 