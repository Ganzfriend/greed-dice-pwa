import { Metadata } from "next";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Greed Game",
  description: "A strategy dice game for all ages",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
