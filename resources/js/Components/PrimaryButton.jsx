export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-teal-800 border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${disabled && 'opacity-100'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
