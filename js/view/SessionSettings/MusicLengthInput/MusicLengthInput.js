export function MusicLengthInput(props) {
    return (
        <li >
            <input
                disabled={props.isPlaying}
                type="number"
                value={props.value}
                step="5"
                min="0"
                className="musicSessionLengths"
                onChange={(event) => props.onChange(event.target.value, props.index)} />
        </li>
    );
}