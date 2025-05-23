import "../styles/index.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import App from "./app";

export const metadata = {
  title: "Nindya Karya",
  description: "Nindya Karya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <App>{children}</App>
      </body>
    </html>
  );
}
