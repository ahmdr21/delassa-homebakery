/**
 * Kompres gambar menggunakan HTML5 Canvas ke format WebP.
 * @param file File asli dari input type="file"
 * @param maxWidth Resolusi lebar maksimum (default: 1200px)
 * @param quality Kualitas kompresi 0 sampai 1 (default: 0.8)
 */
export async function compressImage(
  file: File,
  maxWidth = 1200,
  quality = 0.8
): Promise<File> {
  // Hanya kompres file jpeg, png, dan webp. Format lain seperti svg atau gif (animasi) dibiarkan asli.
  const targetTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!targetTypes.includes(file.type)) {
    console.log(`[ImageCompressor] File type ${file.type} not compressed, uploading original.`);
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Pertahankan aspect ratio jika melebihi maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return reject(new Error("Gagal memuat context 2D Canvas"));
        }

        // Opsional: isi background putih untuk gambar transparan jika dikonversi ke format non-transparan,
        // namun karena kita ke webp (yang mendukung transparansi), langsung gambar saja.
        ctx.drawImage(img, 0, 0, width, height);

        // Convert ke blob dengan format image/webp
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error("Gagal mengonversi gambar ke Blob"));
            }
            
            // Nama file baru menggunakan ekstensi .webp
            const newName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const compressedFile = new File([blob], newName, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            console.log(
              `[ImageCompressor] Compressed "${file.name}" (${(file.size / 1024).toFixed(1)} KB) -> "${newName}" (${(compressedFile.size / 1024).toFixed(1)} KB). Saving: ${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`
            );

            resolve(compressedFile);
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => reject(new Error("Gagal memuat elemen Image"));
    };
    reader.onerror = () => reject(reader.error || new Error("Gagal membaca File"));
  });
}
