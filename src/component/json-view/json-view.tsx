interface Props<T> {
    data: T,
};

export function JsonView<T>({ data }: Readonly<Props<T>>) {
    if (data === undefined) {
        return <span>undefined</span>;
    }

    if (data === null) {
        return <span>null</span>;
    }

    if (typeof data === "string") {
        return <span>&quot;{data}&quot;</span>;
    }

    if (typeof data === "number") {
        return <span>{data}</span>
    }

    const entries = Object.entries(data);

    return (
        <ul>
            {entries.map(([key, value]) => (
                <li key={key}>
                    <span>{key}: </span>
                    <JsonView data={value} />
                </li>
            ))}
        </ul>
    );
}
