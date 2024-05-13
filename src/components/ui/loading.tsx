import { ReactElement } from "react";

function Loading(): ReactElement {
    return (
        <div className="h-screen flex flex-1 flex-col items-center justify-center loading">
            Loading...
        </div>
    );
}

export { Loading }
