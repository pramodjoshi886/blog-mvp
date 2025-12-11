import './globals.css';
import Header from '../components/Header';

export const metadata = {
    title: 'Modern Blog MVP',
    description: 'A statically generated blog example',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main className="container">
                    {children}
                </main>
            </body>
        </html>
    );
}
