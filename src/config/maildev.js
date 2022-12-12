if(process.env.NODE_ENV === "development") {
    async function startMailDev() {
        const { default: Maildev } = await import("maildev");
        const maildev = new Maildev({
            basePathName: "/maildev",
            port: 1025
        });

        maildev.listen((err, data) => {
            if(err) return console.log("failed to load Maildev: " + err);
            return console.log("Maildev server listening check your inbox at http://localhost:1080")
        });
    }

    startMailDev();
}