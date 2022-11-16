import HexButtonCSS from './HexButton.module.css';

export default function HexButton ({digit}){
   return (
    <div className={HexButtonCSS.hexContainer}>
        <div className={HexButtonCSS.hexBlock}></div>
        <p>{digit}</p>
    </div>
   )

}