import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Import routes
import productRoutes from './routes/products';
import assetRoutes from './routes/assets';
import brandRoutes from './routes/brand';
import revenueRoutes from './routes/revenue';
import integrationRoutes from './routes/integrations';
import aiAgentRoutes from './routes/ai-agents';
import knowledgeBaseRoutes from './routes/knowledge-base';
import workflowTemplateRoutes from './routes/workflow-templates';
import productWorkflowRoutes from './routes/product-workflows';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Clerk authentication middleware
app.use(clerkMiddleware());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/ai-agents', aiAgentRoutes);
app.use('/api/knowledge-base', knowledgeBaseRoutes);
app.use('/api/workflow-templates', workflowTemplateRoutes);
app.use('/api/product-workflows', productWorkflowRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Product Control Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 AI Agents: Active`);
  console.log(`🧠 Knowledge Base: Connected`);
});

export default app;
