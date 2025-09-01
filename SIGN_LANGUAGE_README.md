# Sign Language Translator Integration

This project now includes a comprehensive sign language translator that integrates with your learning resources application. The translator provides real-time text-to-sign language conversion with visual guides and accessibility features.

## 🚀 Features

### Core Functionality
- **Text-to-Sign Translation**: Convert any text into sign language instructions
- **Multiple Sign Languages**: Support for ASL, BSL, ISL, AUSLAN, and more
- **Visual Learning**: Step-by-step hand shape and movement guides
- **Audio Support**: Audio descriptions and pronunciation guides
- **Accessibility First**: Designed for all learners including those with disabilities

### Advanced Features
- **Real-time Translation**: Instant conversion with confidence scoring
- **Playback Controls**: Play, pause, and control translation speed
- **Export Options**: Copy translations or download as JSON
- **API Integration**: RESTful API for backend processing
- **Offline Mode**: Fallback functionality when backend is unavailable

## 📋 Prerequisites

### Python Dependencies
```bash
pip install sign-language-translator
pip install flask flask-cors mediapipe opencv-python numpy requests python-dotenv
```

### Node.js Dependencies
```bash
npm install
# or
yarn install
```

## 🛠️ Setup Instructions

### 1. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend server:**
   ```bash
   python start_server.py
   ```
   
   The server will start on `http://localhost:5001`

### 2. Frontend Setup

1. **Start the React development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Access the sign language translator:**
   - Navigate to `/sign-language` in your browser
   - Or access it through the Learning Resources page

## 🎯 Usage Guide

### Basic Translation

1. **Enter Text**: Type or paste the text you want to translate
2. **Select Language**: Choose your target sign language (ASL, BSL, ISL, etc.)
3. **Click Translate**: The system will convert your text to sign language
4. **View Results**: See step-by-step sign instructions with visual guides

### Advanced Features

#### Playback Controls
- **Play**: Start the sign sequence animation
- **Pause**: Stop the current animation
- **Reset**: Return to the beginning
- **Speed Control**: Adjust playback speed (Fast/Normal/Slow)

#### Export Options
- **Copy**: Copy translation instructions to clipboard
- **Download**: Save translation as JSON file for offline use

#### Confidence Indicators
- **Green**: High confidence (80%+)
- **Yellow**: Medium confidence (60-79%)
- **Red**: Low confidence (<60%)

## 🔧 API Endpoints

### Translation API
```http
POST /api/translate
Content-Type: application/json

{
  "text": "Hello, how are you?",
  "language": "asl"
}
```

### Languages API
```http
GET /api/languages
```

### Health Check
```http
GET /api/health
```

### Sign Details
```http
GET /api/sign/<word>
```

## 📁 File Structure

```
├── src/
│   ├── components/
│   │   └── SignLanguageTranslator.tsx    # Main translator component
│   └── pages/
│       └── SignLanguagePage.tsx          # Dedicated sign language page
├── backend/
│   ├── sign_language_service.py         # Flask API service
│   ├── start_server.py                  # Server startup script
│   └── requirements.txt                 # Python dependencies
└── SIGN_LANGUAGE_README.md              # This file
```

## 🎨 Integration with Learning Resources

The sign language translator is fully integrated with your learning resources system:

### Age-Based Sections
- **Primary School (1st-5th)**: Basic sign language concepts
- **Middle School (5th-10th)**: Intermediate sign language skills
- **Intermediate (11th-12th)**: Advanced sign language learning
- **Higher Education**: Professional sign language courses

### Accessibility Features
- **Visual Aids**: High contrast demonstrations
- **Audio Descriptions**: Voice guidance for each sign
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Compatible with assistive technologies

## 🔍 Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure the Python server is running on port 5001
   - Check if all dependencies are installed
   - Verify firewall settings

2. **Translation Not Working**
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Ensure text input is not empty

3. **Sign Language Library Issues**
   - The system will fall back to mock data if the library is unavailable
   - Check Python environment and dependencies
   - Verify sign-language-translator installation

### Debug Mode

Enable debug mode by setting environment variables:
```bash
export FLASK_DEBUG=1
export FLASK_ENV=development
```

## 🚀 Deployment

### Production Setup

1. **Backend Deployment:**
   ```bash
   # Use a production WSGI server
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5001 sign_language_service:app
   ```

2. **Frontend Deployment:**
   ```bash
   npm run build
   # Deploy the dist/ folder to your web server
   ```

3. **Environment Variables:**
   ```bash
   export API_BASE_URL=https://your-api-domain.com
   export NODE_ENV=production
   ```

## 🤝 Contributing

To contribute to the sign language translator:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the API documentation
- Test with the health check endpoint
- Ensure all dependencies are properly installed

## 🔮 Future Enhancements

Planned features for future releases:
- **Video Integration**: Real sign language video demonstrations
- **Machine Learning**: Improved translation accuracy
- **Mobile App**: Native mobile application
- **Offline Mode**: Full offline functionality
- **Community Features**: User-generated content and sharing

---

**Note**: The sign language translator uses the `sign-language-translator` Python library. If the library is not available, the system will operate in mock mode with placeholder data for demonstration purposes.
