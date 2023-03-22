export const assetsMaps = {
    '2023-3-22': {
        images: autoImportImages(import.meta.glob(`../assets/2023-3-22/*.jpeg`, { eager: true })),
        videos: autoImportImages(import.meta.glob(`../assets/2023-3-22/*.mp4`, { eager: true }))
    }
}

function autoImportImages(modules) {
    return Object.keys(modules).map(k => modules[k].default)
}