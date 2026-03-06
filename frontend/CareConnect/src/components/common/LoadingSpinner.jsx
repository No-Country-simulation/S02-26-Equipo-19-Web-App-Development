/**
 * LoadingSpinner – presentational component.
 * Displays a centered animated spinner while async operations are in progress.
 * @param {string} [message] - Optional text displayed below the spinner.
 * @param {string} [size] - "sm" | "md" | "lg". Defaults to "md".
 */
const LoadingSpinner = ({ message = "", size = "md" }) => {
    const sizes = {
        sm: { outer: "w-10 h-10", middle: "w-6 h-6", dot: "w-2 h-2" },
        md: { outer: "w-16 h-16", middle: "w-10 h-10", dot: "w-3 h-3" },
        lg: { outer: "w-24 h-24", middle: "w-16 h-16", dot: "w-4 h-4" },
    };

    const s = sizes[size] ?? sizes.md;

    return (
        <div className="flex flex-col items-center justify-center w-full py-16 gap-5">

            {/* Spinner stack */}
            <div className="relative flex items-center justify-center">

                {/* Outer ring – slow, clockwise */}
                <div
                    className={`absolute ${s.outer} rounded-full border-4 border-transparent border-t-page-admin border-r-page-admin opacity-80 animate-spin`}
                    style={{ animationDuration: "1.2s" }}
                />

                {/* Middle ring – faster, counter-clockwise */}
                <div
                    className={`absolute ${s.middle} rounded-full border-4 border-transparent border-b-page-login border-l-page-login opacity-50 animate-spin`}
                    style={{ animationDuration: "0.8s", animationDirection: "reverse" }}
                />

                {/* Pulsing center dot */}
                <div
                    className={`${s.dot} rounded-full bg-page-admin animate-ping opacity-75`}
                    style={{ animationDuration: "1s" }}
                />
            </div>

            {/* Optional message */}
            {message && (
                <p className="text-sm text-f-secondary mt-5 tracking-wide animate-pulse">
                    {message}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;
