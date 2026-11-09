import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory store for received client enquiries during session
interface EnquiryRecord {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  whatsappNumber: string;
  service: string;
  projectDescription: string;
  submittedAt: string;
}

const enquiriesStore: EnquiryRecord[] = [];

// API: Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    agency: 'LankanWeb',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API: Process project enquiries
app.post('/api/enquiry', (req, res) => {
  const { fullName, businessName, email, whatsappNumber, service, projectDescription } = req.body || {};

  // Validation
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Please enter your full name.',
    });
  }

  if (!businessName || typeof businessName !== 'string' || businessName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: 'Please enter your business or company name.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address.',
    });
  }

  if (!whatsappNumber || typeof whatsappNumber !== 'string' || whatsappNumber.trim().length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid WhatsApp phone number.',
    });
  }

  if (!projectDescription || typeof projectDescription !== 'string' || projectDescription.trim().length < 10) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a brief description of your project (at least 10 characters).',
    });
  }

  const enquiryId = `LW-${Date.now().toString(36).toUpperCase()}`;
  const record: EnquiryRecord = {
    id: enquiryId,
    fullName: fullName.trim(),
    businessName: businessName.trim(),
    email: email.trim(),
    whatsappNumber: whatsappNumber.trim(),
    service: service || 'Website Development',
    projectDescription: projectDescription.trim(),
    submittedAt: new Date().toISOString(),
  };

  enquiriesStore.push(record);

  console.log(`[LankanWeb] New Qualified Project Enquiry Received:`, {
    id: enquiryId,
    client: record.fullName,
    business: record.businessName,
    service: record.service,
  });

  return res.status(200).json({
    success: true,
    enquiryId,
    message: 'Your project brief has been received. A senior strategist from LankanWeb will contact you shortly.',
    data: {
      enquiryId,
      fullName: record.fullName,
      service: record.service,
    },
  });
});

async function startServer() {
  if (!isProduction) {
    // Development mode: Mount Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LankanWeb] Server running at http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[LankanWeb] Failed to start server:', err);
  process.exit(1);
});
