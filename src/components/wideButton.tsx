import React, { MouseEventHandler, PropsWithChildren } from "react";
import wideButtonCSS from './styles/wideButton.module.css'

type Props = {
    children: React.ReactNode,
    clickAction: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FunctionComponent<Props> = (props:Props) => {
    return (
        <button onClick={props.clickAction} className={wideButtonCSS.MainWideButton}>{props.children}</button>
    )
}

export default Button;