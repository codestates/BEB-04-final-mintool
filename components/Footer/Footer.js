// import Image from 'next/image'
// import Mintool from '../../public/MinTool.png'
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton, Typography } from '@mui/material';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography variant="h4">Contributer Git</Typography>
                <IconButton><Link href="https://github.com/ckh7488"><div><GitHubIcon />ckh7488</div></Link></IconButton>
                <IconButton><Link href="https://github.com/bing72"><div><GitHubIcon />bing74</div></Link></IconButton>
            </div>
            {/* <Image src={Mintool} height="250" color='red'/>                */}
        </footer>
    )
}