export default (props) => {

    return (
        <footer py-8 op-80>
            <p text-center text-sm text-neutral-400>
                <span pr-1>Assets are from</span>
                <a pr-1
                    text-neutral-400 border-b border-neutral-400 border-dotted
                    hover:text-violet-400
                    href="https://github.com/microsoft/fluentui-emoji" target="_blank"
                >
                    Fluent Emoji
                </a>
                <span pr-1>by Microsoft and </span>
                <a
                    text-neutral-400 border-b border-neutral-400 border-dotted
                    hover:text-violet-400
                    href="https://ddiu.io" target="_blank"
                >
                    Diu
                </a>
                <span>. Remixed and partially modified.</span>
            </p>
            <p text-center text-xs text-gray-400>
                <span pr-2>Made by</span>
                <a text-gray-400
                    text-neutral-400 border-b border-neutral-400 border-dotted
                    hover:text-violet-400
                    href="https://github.com/VenusTZZ" target="_blank">Venus</a>
                <span> | </span>
                <a text-gray-400
                    text-neutral-400 border-b border-neutral-400 border-dotted
                    hover:text-violet-400
                    href="https://github.com/VenusTZZ/fluent-emoji-leaner" target="_blank">Source Repositories</a>
                <span> | </span>
                <a text-gray-400
                    text-neutral-400 border-b border-neutral-400 border-dotted
                    hover:text-violet-400
                    href="https://fluent-emoji-leaner.vercel.app/" target="_blank">To vercel</a>
            </p>
        </footer>
    )
}