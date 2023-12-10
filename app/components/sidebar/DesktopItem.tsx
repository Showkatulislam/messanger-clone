'use client'
import Link from 'next/link';
interface desktopItemProps{
    icon:any,
    label:string,
    onClick?:()=>void,
    href:string
    active?:boolean
}
const DesktopItem:React.FC<desktopItemProps> = ({
    icon:Icon,
    label,
    href,
    onClick
}) => {
    const handleClick=()=>{
        if(onClick){
            return onClick()
        }
    }
    return (
        <li onClick={handleClick} className='flex flex-col justify-center items-center'>
            <Link href={href}>
                <Icon className='h-6 w-6' />
                <span className='sr-only'>{label}</span>
            </Link>
        </li>
    );
};

export default DesktopItem;