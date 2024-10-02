const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
require('dotenv').config();  // Automatically load .env variables

const hostname = '0.0.0.0';
const port = process.env.PORT || 80;  // Use PORT from .env file or default to 80
const feedbackFolder = path.join(__dirname, 'feedback');
const tempFolder = path.join(__dirname, 'temp');

// Ensure the directories exist
if (!fs.existsSync(feedbackFolder)) {
    fs.mkdirSync(feedbackFolder);
}
if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder);
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Feedback Form</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                        text-align: center;
                    }
                    h1 {
                        color: #333;
                    }
                    form {
                        background-color: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        max-width: 400px;
                        margin: 0 auto;
                    }
                    input[type="text"], textarea {
                        width: 100%;
                        padding: 10px;
                        margin: 10px 0;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                    }
                    button {
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        padding: 10px 15px;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <h1>Submit Your Feedback</h1>
                <form action="/submit" method="POST">
                    <input type="text" name="title" placeholder="Title" required>
                    <textarea name="feedback" placeholder="Your feedback" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </body>
            </html>`);
    } else if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', () => {
            const { title, feedback } = querystring.parse(body);
            const filePath = path.join(feedbackFolder, `${title}.txt`);
            const tempFilePath = path.join(tempFolder, `${title}.txt`);

            if (fs.existsSync(filePath)) {
                // Store in temporary folder
                fs.writeFileSync(tempFilePath, feedback);
                res.writeHead(302, { 'Location': '/exist.html' });
                res.end();
            } else {
                fs.writeFileSync(filePath, feedback);
                res.writeHead(302, { 'Location': `/feedback.html?title=${encodeURIComponent(title)}&feedback=${encodeURIComponent(feedback)}` });
                res.end();
            }
        });
    } else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/feedback.html')) {
        const query = parsedUrl.query;
        const { title, feedback } = query;

        // Serve feedback.html with inline CSS
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Feedback Submitted</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                        text-align: center;
                    }
                    h1 {
                        color: #333;
                    }
                    h2 {
                        color: #0056b3;
                    }
                    p {
                        color: #666;
                    }
                    a {
                        text-decoration: none;
                        color: #007bff;
                    }
                </style>
            </head>
            <body>
                <h1>Feedback Submitted</h1>
                <h2>Title: ${title}</h2>
                <p>Feedback: ${feedback}</p>
                <a href="/">Go back</a>
            </body>
            </html>`);
    } else if (req.method === 'GET' && parsedUrl.pathname === '/exist.html') {
        // Serve exist.html with inline CSS
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>File Exists</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                        text-align: center;
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        color: #666;
                    }
                    a {
                        text-decoration: none;
                        color: #007bff;
                    }
                </style>
            </head>
            <body>
                <h1>File Already Exists</h1>
                <p>Your feedback has been stored temporarily.</p>
                <a href="/">Go back</a>
            </body>
            </html>`);
    } else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/feedback/')) {
        // Serve feedback text files
        const fileName = parsedUrl.pathname.split('/feedback/')[1];
        const filePath = path.join(feedbackFolder, fileName);

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(fileContent);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found.');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found.');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
