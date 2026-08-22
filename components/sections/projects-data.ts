export type Project = {
  id: string
  title: string
  pitch: string
  stack: string[]
  liveUrl?: string
  githubUrl?: string
  detail: {
    label: string
    body: string
  }[]
  metric?: { value: string; label: string }[]
}

export const projects: Project[] = [
  {
    id: 'documind',
    title: 'DocuMind',
    pitch: 'Production RAG pipeline with hybrid retrieval and citation-grounded answers.',
    stack: ['LangChain', 'FastAPI', 'Azure OpenAI', 'pgvector', 'Cohere'],
    liveUrl: 'https://docu-mind.tech',
    githubUrl: 'https://github.com',
    detail: [
      {
        label: 'Problem',
        body: 'Standard RAG pipelines use either pure vector search (misses exact keyword and rare-term matches) or pure keyword search (misses semantic similarity). Most production systems hallucinate when context is thin, with no visibility into why an answer was generated.',
      },
      {
        label: 'Approach',
        body: 'Hybrid retrieval combining pgvector dense embeddings with BM25 sparse retrieval, fused via Reciprocal Rank Fusion (RRF), then Cohere semantic reranking before the LLM. Citation-grounded answers constrain the model to cite source chunks, reducing hallucination.',
      },
      {
        label: 'Engineering',
        body: 'SSE streaming for real-time token responses; session-isolated multi-user architecture; per-query cost tracking at $0.00115/query; LangSmith observability with full latency breakdown across 3 A/B pipeline variants. Deployed on Heroku after eliminating a 500MB torch dependency from the production slug by moving reranking to Cohere\u2019s hosted API instead of a local cross-encoder.',
      },
    ],
    metric: [
      { value: '0.962', label: 'RAGAS faithfulness' },
      { value: '0.966', label: 'Answer relevancy' },
      { value: '$0.00115', label: 'Cost / query' },
    ],
  },
  {
    id: 'automed',
    title: 'AutoMed AI',
    pitch: 'Autonomous multi-agent pipeline for medical image classification.',
    stack: ['LangGraph', 'FastAPI', 'PyTorch', 'Next.js', 'WebSockets'],
    githubUrl: 'https://github.com',
    detail: [
      {
        label: 'Overview',
        body: 'An end-to-end multi-agent pipeline automating dataset inspection, GAN-based data augmentation, and adaptive model training.',
      },
      {
        label: 'Interface',
        body: 'A Next.js dashboard streams agent logs over WebSockets in real time, giving full visibility into each agent’s decisions as the pipeline runs.',
      },
    ],
  },
  {
    id: 'daigno-q',
    title: 'dAIgno-Q',
    pitch: 'Hybrid classical-quantum ML pipeline for retinal disease detection',
    stack: ['PyTorch', 'PennyLane', 'QSVM', 'VQC', 'ResNet50'],
    detail: [
      {
        label: 'Overview',
        body: 'Built a hybrid classical–quantum ML pipeline for retinal disease detection using ResNet50 feature extraction combined with Quantum Support Vector Machines (QSVMs) and Variational Quantum Circuits (VQCs) on medical imaging datasets.',
      },
      {
        label: 'Method',
        body: 'Applied transfer learning, robust preprocessing, and PCA-based dimensionality reduction to efficiently embed image features into quantum circuits.',
      },
      {
        label: 'Engineering',
        body: 'Implemented the full pipeline in PyTorch and PennyLane, delivering an end-to-end quantum-enhanced computer vision system.',
      },
    ],
  },
]
