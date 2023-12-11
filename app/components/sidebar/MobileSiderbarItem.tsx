'use client'
import Link from 'next/link';
interface desktopItemProps{
    icon:any,
    label:string,
    onClick?:()=>void,
    href:string
    active?:boolean
}
const MobileSiderbarItem:React.FC<desktopItemProps> = ({
    icon:Icon,
    onClick,
    href,
    active
}) => {
    const handleClick=()=>{
        if(onClick){
            return onClick()
        }
    }
    return (
        <div role='button' onClick={handleClick}>
            <Link href={href}>
             <Icon size={24}/>
            </Link>
        </div>
    );
};

export default MobileSiderbarItem;