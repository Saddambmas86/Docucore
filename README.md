# PDF Processor

A modern web application for processing PDF files with advanced features, similar to iLovePDF. Built with React, Node.js, and Express.

## Features

- **Merge PDFs**: Combine multiple PDF files into a single document
- **Split PDF**: Split a PDF into multiple documents
- **Compress PDF**: Reduce PDF file size while maintaining quality
- **OCR PDF**: Extract text from scanned PDF documents
- **Protect PDF**: Add password protection to your PDF
- **Convert to PDF**: Convert images and documents to PDF
- **User Dashboard**: Track usage statistics and recent activities
- **Modern UI**: Built with Material-UI for a beautiful user experience

## Tech Stack

### Frontend
- React
- Material-UI
- React Router
- React Dropzone
- Recharts

### Backend
- Node.js
- Express
- PDF-lib
- PDF-parse
- Multer

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pdf-processor.git
cd pdf-processor
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. Start the backend server:
```bash
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`.

## API Endpoints

- `POST /api/merge`: Merge multiple PDF files
- `POST /api/split`: Split a PDF into multiple documents
- `POST /api/compress`: Compress a PDF file
- `POST /api/ocr`: Perform OCR on a PDF
- `POST /api/protect`: Add password protection to a PDF
- `POST /api/convert`: Convert files to PDF

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PDF-lib](https://pdf-lib.js.org/) for PDF manipulation
- [Material-UI](https://mui.com/) for the UI components
- [React Dropzone](https://react-dropzone.js.org/) for file uploads 