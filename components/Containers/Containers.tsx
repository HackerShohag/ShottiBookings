import './styles.css'

interface Props {
    children: React.ReactNode;
    className?: string;
    height?: string;
    width?: string;
    minHeight?: string;
    minWidth?: string;
}

export const SolidContainer = (props: Props) => {
    const containerStyle = {
        height: props.height,
        width: props.width,
        minHeight: props.minHeight,
        minWidth: props.minWidth,
    };

    return (
        <div className={`App solid-container ${props.className}`} style={containerStyle}>
            {props.children}
        </div>
    );
}

export const BorderContainer = (props: Props) => {
    const containerStyle = {
        height: props.height,
        width: props.width,
    };

    return (
        <div className={`border-container ${props.className}`} style={containerStyle}>
            {props.children}
        </div>
    )
}

export const GlassmorphicContainer = (props: Props) => {
    const containerStyle = {
        height: props.height,
        width: props.width,
    };

    return (
        <div className={`App glassmorphic-container ${props.className}`} style={containerStyle}>
            {props.children}
        </div>
    );
}