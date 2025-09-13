const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ScriptGuardian. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
