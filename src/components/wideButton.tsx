import React, { MouseEventHandler, PropsWithChildren } from "react";
// import wideButtonCSS from './styles/wideButton.module.css'

type Props = {
    children: React.ReactNode,
    clickAction: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FunctionComponent<Props> = (props:Props) => {
    return (
        <button>{props.children}</button>
    )
}

export default Button;