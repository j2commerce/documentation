import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
    let zoom = null;

    function initZoom() {
        import('medium-zoom').then((mediumZoom) => {
            const zoomFunc = mediumZoom.default || mediumZoom;

            // Find all Mermaid SVGs that haven't been zoomed yet
            const svgs = document.querySelectorAll('.docusaurus-mermaid-container svg:not([data-zoom-initialized])');

            if (svgs.length > 0) {
                svgs.forEach(svg => {
                    svg.setAttribute('data-zoom-initialized', 'true');
                });

                if (!zoom) {
                    zoom = zoomFunc('.docusaurus-mermaid-container svg[data-zoom-initialized]', {
                        background: 'rgba(0,0,0,0.8)',
                        margin: 24
                    });
                } else {
                    zoom.attach('.docusaurus-mermaid-container svg[data-zoom-initialized]');
                }
            }
        });
    }

    // Initialize on page load
    window.addEventListener('load', initZoom);

    // Re-initialize on route changes (Docusaurus SPA navigation)
    if (typeof window !== 'undefined') {
        // Use a MutationObserver to detect when new Mermaid diagrams are added
        const observer = new MutationObserver(() => {
            initZoom();
        });

        // Start observing when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
                initZoom();
            });
        } else {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            initZoom();
        }
    }
}

export default function() {
    // This function is required for clientModules but the actual logic runs above
}
