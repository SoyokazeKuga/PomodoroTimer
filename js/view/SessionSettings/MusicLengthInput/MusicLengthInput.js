export function MusicLengthInput(props) {
    return (
        <li >
            <input
                type="number"
                value={props.value}
                step="5"
                className="musicSessionLengths"
                onChange={(event) => props.onChange(event.target.value, props.index)} />
        </li>
    );
}