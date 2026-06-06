type FooterProps = {
    location: string;
    year: number;
};

export default function Footer({ location, year }: FooterProps) {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© {year} Clínica Veterinaria</p>
                <span className="separator">|</span>
                <p>{location}</p>
            </div>
        </footer>
    );
}