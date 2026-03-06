import mediumZoom from 'medium-zoom';

export default function zoomMermaid() {
    mediumZoom('.docusaurus-mermaid-container svg', {
        background: 'rgba(0,0,0,0.8)',
        margin: 24
    });
}
