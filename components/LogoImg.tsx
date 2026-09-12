// Prefix sub-path saat deploy GitHub Pages (/kalenderpesma).
// next/image & metadata icons tidak otomatis ikut basePath dalam
// mode static export, jadi aset dirujuk manual lewat konstanta ini.
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/kalenderpesma" : "";

export function LogoImg({
  size,
  className = "",
  eager = false,
}: {
  size: number;
  className?: string;
  eager?: boolean;
}) {
  return (
    // Sengaja <img> biasa: next/image tidak mem-prefix basePath dalam
    // static export, sedangkan Pages butuh path /kalenderpesma/...
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${BASE_PATH}/logo.jpeg`}
      alt="Logo Pesma Nur Alannur"
      width={size}
      height={size}
      loading={eager ? "eager" : "lazy"}
      className={className}
    />
  );
}
