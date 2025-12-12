import './globals.css';
import Header from '../components/Header';
import GoogleAdSense from '../components/GoogleAdSense';

export const metadata = {
    title: 'Modern Blog MVP',
    description: 'A statically generated blog example',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <GoogleAdSense publisherId="ca-pub-8615879653416448" />
                <main className="container">
                    {children}
                </main>
            </body>
        </html>
    );
}
