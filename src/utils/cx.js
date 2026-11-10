/** Joins truthy class names: cx('a', condition && 'b') -> 'a b'. */
export default function cx(...names) {
    return names.filter(Boolean).join(' ');
}
