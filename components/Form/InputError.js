export default function InputError({ message, children, className = '' }) {
    return message ? (
        <p className={'text-p-red font-size-14 pt-2' + className}>{message || children}</p>
    ) : null;
}
