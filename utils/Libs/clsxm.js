/** Merge classes without using external packages */
export default function clsxm(...classes) {
    return classes.filter(Boolean).join(' ');
}
