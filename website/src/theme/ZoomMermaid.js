import mediumZoom from 'medium-zoom';

export default function zoomMermaid() {
    mediumZoom('.mermaid svg', {
        background: 'rgba(0,0,0,0.8)',
        margin: 24
    });
}
